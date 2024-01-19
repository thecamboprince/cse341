// Importing the 'dotenv' library to load environment variables from a .env file
const dotenv = require('dotenv');
dotenv.config();

// Importing the MongoClient from the 'mongodb' library
const MongoClient = require('mongodb').MongoClient;

// Variable to store the MongoDB client instance
let _db;

// Function to initialize the MongoDB connection
const initDb = (callback) => {
  // Checking if the database is already initialized
  if (_db) {
    console.log('Db is already initialized!');
    // Returning the initialized database instance
    return callback(null, _db);
  }

  // Connecting to the MongoDB using the URI from the environment variables
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      // Storing the MongoDB client instance in the _db variable
      _db = client;
      // Calling the callback with the initialized database instance
      callback(null, _db);
    })
    .catch((err) => {
      // Calling the callback with an error if the connection fails
      callback(err);
    });
};

// Function to get the initialized MongoDB database instance
const getDb = () => {
  // Throwing an error if the database is not initialized
  if (!_db) {
    throw Error('Db not initialized');
  }
  // Returning the initialized database instance
  return _db;
};

// Exporting the initDb and getDb functions for use in other modules
module.exports = {
  initDb,
  getDb,
};
