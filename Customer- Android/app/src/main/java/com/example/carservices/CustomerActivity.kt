package com.example.carservices

import android.app.Dialog
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.ArrayAdapter
import android.widget.EditText
import android.widget.ListView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener

class CustomerActivity : AppCompatActivity() {
    private lateinit var dialog: Dialog
    private lateinit var toolbar: Toolbar
    private lateinit var search: TextView
    private lateinit var list: ListView
    private lateinit var done_ServiceList: ListView
    private lateinit var next_ServiceList: ListView
    private lateinit var custom: EditText
    private val platesList = ArrayList<String>()
    private val doneserviceList = ArrayList<String>()
    private val nextserviceList = ArrayList<String>()
    var carId: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.customer_layout)

        toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        val customerName = intent.getStringExtra("customerName")
        supportActionBar?.title = "Welcome $customerName"

        val customerId = intent.getStringExtra("customerId")

        search = findViewById(R.id.searchcar)
        search.setOnClickListener {
            dialog = Dialog(this)
            dialog.setContentView(R.layout.searchable)
            dialog.window?.setLayout(1000, 2000)
            dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
            dialog.show()

            list = dialog.findViewById(R.id.CustomerList)
            custom = dialog.findViewById(R.id.customersearch)
            custom.isAllCaps = true

            custom.addTextChangedListener(object : TextWatcher {
                override fun beforeTextChanged(
                    s: CharSequence?,
                    start: Int,
                    count: Int,
                    after: Int
                ) {
                }

                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                    val query = s.toString().trim()
                    val filteredList = platesList.filter { plate ->
                        plate.contains(query, ignoreCase = true)
                    }
                    val adapter = ArrayAdapter(
                        this@CustomerActivity,
                        android.R.layout.simple_list_item_1,
                        filteredList
                    )
                    list.adapter = adapter
                }

                override fun afterTextChanged(s: Editable?) {}
            })

            if (customerId != null) {
                platesList.clear()
                plateslistcompletion(customerId)
            }
        }
    }

    private fun plateslistcompletion(customerId: String) {
        val carRef = FirebaseDatabase.getInstance().getReference("car")
        val query = carRef.orderByChild("customerId").equalTo(customerId)
        query.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                for (snapshot in dataSnapshot.children) {
                    val plate = snapshot.child("plate").getValue(String::class.java)
                    carId = snapshot.key.toString()
                    plate?.let {
                        platesList.add(plate)
                    }
                }
                val adapter = ArrayAdapter(
                    this@CustomerActivity,
                    android.R.layout.simple_list_item_1,
                    platesList
                )
                list.adapter = adapter

                list.setOnItemClickListener { _, _, position, _ ->
                    val selectedPlate = platesList[position]
                    search.setText(selectedPlate)
                    showServiceList(carId)
                    dialog.dismiss()
                }
            }

            override fun onCancelled(databaseError: DatabaseError) {
                // Handle errors
                databaseError.toException().printStackTrace()
            }
        })
    }

    private fun showServiceList(carId: String) {
        val doneRef = FirebaseDatabase.getInstance().getReference("doneservice")
        val query1 = doneRef.orderByChild("carId").equalTo(carId)
        query1.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                for (snapshot in dataSnapshot.children) {
                    val serviceType = snapshot.child("type").getValue(String::class.java)
                    val serviceDate = snapshot.child("date").getValue(String::class.java)
                    val serviceComms = snapshot.child("comms").getValue(String::class.java)

                    val serviceInfo = "Service Type: $serviceType, Service Date: $serviceDate, Comments: $serviceComms"
                    doneserviceList.add(serviceInfo)
                }
                val adapter = ArrayAdapter(
                    this@CustomerActivity,
                    android.R.layout.simple_list_item_1,
                    doneserviceList
                )
                done_ServiceList = findViewById(R.id.done_Service)
                done_ServiceList.adapter = adapter
            }

            override fun onCancelled(databaseError: DatabaseError) {
                databaseError.toException().printStackTrace()
            }
        })


        val nextRef = FirebaseDatabase.getInstance().getReference("nextservice")
        val query2 = nextRef.orderByChild("carId").equalTo(carId)
        query2.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                for (snapshot in dataSnapshot.children) {
                    val serviceType = snapshot.child("type").getValue(String::class.java)
                    val serviceDate = snapshot.child("date").getValue(String::class.java)

                    val serviceInfo = "Service Type: $serviceType, Service Date: $serviceDate"
                    nextserviceList.add(serviceInfo)
                }
                val adapter = ArrayAdapter(
                    this@CustomerActivity,
                    android.R.layout.simple_list_item_1,
                    nextserviceList
                )
                next_ServiceList = findViewById(R.id.next_Service)
                next_ServiceList.adapter = adapter
            }

            override fun onCancelled(databaseError: DatabaseError) {
                databaseError.toException().printStackTrace()
            }
        })
    }
}