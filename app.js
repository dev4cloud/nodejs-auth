/**
 * app.js
 * exports an Express app as a function
 */

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
//add body parser as middleware for all requests
app.use(bodyParser.json());

//load ENV Variables from config file
const config = require('./config/local');
process.env.APP_PORT = config.APP_PORT;
process.env.DB_HOST = config.DB_HOST;
process.env.DB_USER = config.DB_USER;
process.env.DB_PASS = config.DB_PASS
process.env.JWT_KEY = config.JWT_KEY;


//interact with MongoDB
const mongoose = require('mongoose');
//compose connection details
let dbConn = "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST;
//connect to the database
mongoose.connect(dbConn, {useNewUrlParser: true}).then( () => {
  console.log('Connected to the database');
}).catch( err => {
  console.log('Error connecting to the database: ' + err);
  process.exit();
})

//define routes
app.get('/', (req, res) => {
  res.send({
    message: 'Hello!'
  })
})

//import router with endpoints definitions
const routes = require('./api/routes');
//attach router as a middleware
app.use(routes);

module.exports = app;