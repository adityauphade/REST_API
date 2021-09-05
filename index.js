require('dotenv').config()


var express = require("express");
var app = express();
var mongoose = require("mongoose");


mongoose.connect(process.env.DATABASE_URL)
// mongoose.connect('mongodb://localhost/grocery')
const db = mongoose.connection


//if error in connection
db.on("error", (err) => console.error(err))
//on connection
db.once('open', () => console.log('Connected to Database'))


//allows the data in the form of json in http/rest api
app.use(express.json()) //pushed all the received data in request.body


const groceryRouter = require('./routes/grocery')
app.use('/grocery', groceryRouter)


app.listen("3000", () => console.log("Server has started"));