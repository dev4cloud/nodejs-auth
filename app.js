/**
 * app.js
 * exports an Express app as a function
 */

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
//add body parser as middleware for all requests
app.use(bodyParser.json());

//define routes
app.get('/', (req, res) => {
  res.send({
    message: 'Hello!'
  })
})

process.env.JWT_KEY = "thisIsMyJwtKeyUsedToEncodeTheTokens";


//import router with endpoints definitions
const routes = require('./api/routes');
//attach router as a middleware
app.use(routes);

module.exports = app;