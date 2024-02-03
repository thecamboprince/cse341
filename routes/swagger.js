// Importing the Express Router and Swagger UI for API documentation
const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");

// Importing the Swagger documentation file
const swaggerDocument = require("../swagger.json");

// Using the Swagger UI middleware to serve Swagger UI at the "/api-docs" endpoint
router.use("/api-docs", swaggerUi.serve);

// Setting up the Swagger UI to display the Swagger documentation at the "/api-docs" endpoint
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

// Exporting the router for use in other parts of the application
module.exports = router;
