const express = require('express');
const app = express();
const pgsql = require('./dbcon.js');
const client = pgsql.client;

// Connect to Google Cloud SQL database
client.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});

// Print test query to console
client.query(`SELECT * FROM users`, (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end()
});
