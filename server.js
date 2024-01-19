// Import the 'express' module and assign it to the variable 'express'
var express = require('express');

// Create an instance of the 'express' application
var app = express();

// Define a constant variable 'port' and set it to the value of the environment variable 'PORT' or 3000 if not available
const port = process.env.PORT || 3000;

// Use the routes defined in the 'routes' module for the root path '/'
app.use('/', require('./routes'));

// Start the server and make it listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

