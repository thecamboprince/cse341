// Importing the 'swagger-autogen' module and immediately invoking it to create an instance
const swaggerAutogen = require("swagger-autogen")();

// Configuration object for defining basic information about the API documentation
const doc = {
  info: {
    title: "My API", // Specify the title of the API documentation
    description: "Contact API", // Provide a brief description of the API
  },
  host: "cse341-zp04.onrender.com", // Define the host where the API is hosted
  schemes: ["https"], // Specify the communication protocol (in this case, HTTPS)
};

// File path for the output JSON file where the generated Swagger documentation will be saved
const outputFile = "./swagger.json";

// Array of file paths containing the endpoint definitions to be documented
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
