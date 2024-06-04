package com.example.carservices

import android.app.Dialog
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar

class CustomerActivity : AppCompatActivity() {
    private lateinit var dialog: Dialog
    var toolbar: Toolbar? = null
    lateinit var search: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.customer_layout)
        toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar!!.title = "LOGIN"

        search = findViewById(R.id.searchcust)
        search.setOnClickListener {
            dialog = Dialog(this)
            dialog.setContentView(R.layout.searchable)
            dialog.window?.setLayout(1000, 2000)
            dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
            dialog.show()

        }
    }
}
