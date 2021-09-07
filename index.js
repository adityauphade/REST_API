require('dotenv').config()


var express = require("express");
var app = express();
var mongoose = require("mongoose");
var log = require("./logger/loggerFunction")
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

mongoose.connect(process.env.DATABASE_URL)
// mongoose.connect('mongodb://localhost/userData')
const db = mongoose.connection


//if error in connection
db.on("error", (err) => log.error(err))
//on connection
db.once('open', () => {
    console.log('Connected to Database')
    log.info("Connected to Database")
    
})


//
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//allows the data in the form of json in http/rest api
app.use(express.json()) //pushed all the received data in request.body


const userRouter = require('./routes/userRoute')
app.use('/userData', userRouter)


app.listen("3000", () => {
    console.log("Server has started")
});