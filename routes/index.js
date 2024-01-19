// Require the 'express' module and create a router instance
const routes = require('express').Router();

// Require the 'myController' module
const myController = require('../controllers');

// Define routes for the root path '/' and '/awesome', using functions from the 'myController' module
routes.get('/', myController.awesomeFunction);
routes.get('/awesome', myController.returnAnotherPerson);

// Export the router for use in other modules
module.exports = routes;
