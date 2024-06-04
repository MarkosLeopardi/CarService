package com.example.carservices

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar


class MainActivity : AppCompatActivity() {
    var toolbar: Toolbar? = null
    private lateinit var log: Button
    private lateinit var user: EditText
    private lateinit var pass: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar!!.title = "LOGIN"

        log = findViewById(R.id.login)
        log.setOnClickListener{
            val intent = Intent(this@MainActivity, CustomerActivity::class.java)
            startActivity(intent)
        }

    }
}