package com.example.carservices

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener

class MainActivity : AppCompatActivity() {
    private lateinit var toolbar: Toolbar
    private lateinit var log: Button
    private lateinit var user: EditText
    private lateinit var pass: EditText
    private lateinit var firebaseAuth: FirebaseAuth
    private lateinit var firebaseDatabase: FirebaseDatabase

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar!!.title = "LOGIN"

        firebaseAuth = FirebaseAuth.getInstance()
        firebaseDatabase = FirebaseDatabase.getInstance()

        user = findViewById(R.id.Email)
        pass = findViewById(R.id.Password)
        log = findViewById(R.id.login)

        log.setOnClickListener {
            val email = user.text.toString()
            val password = pass.text.toString()

            if (email.isNotEmpty() && password.isNotEmpty()) {
                firebaseAuth.signInWithEmailAndPassword(email, password).addOnCompleteListener { task ->
                    if (task.isSuccessful) {
                        // Fetch customer name and ID based on the authenticated user's email
                        val user: FirebaseUser? = firebaseAuth.currentUser
                        if (user != null) {
                            val userEmail = user.email
                            if (userEmail != null) {
                                fetchCustomerDetails(userEmail)
                            }
                        }
                    } else {
                        Toast.makeText(this, task.exception?.message, Toast.LENGTH_SHORT).show()
                    }
                }
            } else {
                Toast.makeText(this, "Empty Fields Are Not Allowed !!", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun fetchCustomerDetails(email: String) {
        val customerRef = firebaseDatabase.getReference("customers")

        customerRef.orderByChild("email").equalTo(email).addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                if (dataSnapshot.exists()) {
                    for (snapshot in dataSnapshot.children) {
                        val customerId = snapshot.key
                        val customerName = snapshot.child("name").getValue(String::class.java)
                        if (customerId != null && customerName != null) {
                            val intent = Intent(this@MainActivity, CustomerActivity::class.java)
                            intent.putExtra("customerName", customerName)
                            intent.putExtra("customerId", customerId)
                            startActivity(intent)
                            finish()
                            return
                        }
                    }
                } else {
                    Toast.makeText(this@MainActivity, "Customer not found for email: $email", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onCancelled(databaseError: DatabaseError) {
                Toast.makeText(this@MainActivity, "Error fetching customer data: ${databaseError.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
