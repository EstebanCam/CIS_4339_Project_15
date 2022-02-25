//Create server
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

// Connect to MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://userKen:ken123@cluster0.azb0e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


// import Models
const intakeForm = require('./models/intakeForm')
const program = require('./models/program')

mongoose.connect("mongodb+srv://userKen:ken123@cluster0.azb0e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => {
    console.log("Connected to DB!");
}). catch((err) => {
    console.error("Mongo Connection Error", err)
});

app.get('/', function(req, res) {
    res.send('hello world')
})

app.listen(port)