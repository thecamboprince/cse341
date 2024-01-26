// Importing the 'express' library to create a router
const express = require("express");
const router = express.Router();

// Importing the contacts controller module
const contactsController = require("../controllers/contacts");

// Defining a route for handling the 'GET /' endpoint
router.get("/", contactsController.getAll);

// Defining a route for handling the 'GET /:id' endpoint
router.get("/:id", contactsController.getSingle);

// Handle POST requests to create a new contact
router.post("/", contactsController.createContact);

// Handle PUT requests to update an existing contact by ID
router.put("/:id", contactsController.updateContact);

// Handle DELETE requests to delete a contact by ID
router.delete("/:id", contactsController.deleteContact);

// Exporting the router to be used in other parts of the application
module.exports = router;
