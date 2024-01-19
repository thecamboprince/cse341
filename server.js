// Importing the 'express' library for creating the web application
const express = require('express');
// Importing 'body-parser' to parse incoming JSON requests
const bodyParser = require('body-parser');
// Importing the MongoDB connection module
const mongodb = require('./db/connect');

// Defining the port for the server to listen on, defaulting to 8080 if not provided in environment variables
const port = process.env.PORT || 8080;
// Creating an instance of the express application
const app = express();

// Configuring middleware to parse incoming JSON requests
app.use(bodyParser.json())
  // Setting up middleware to handle Cross-Origin Resource Sharing (CORS)
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  // Mounting the routes defined in the 'routes' module
  .use('/', require('./routes'));

// Initializing the MongoDB connection
mongodb.initDb((err, mongodb) => {
  if (err) {
    // Logging an error message if the initialization fails
    console.log(err);
  } else {
    // Starting the server and logging a success message
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});