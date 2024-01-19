// Importing the MongoDB connection and ObjectId from the 'mongodb' library
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Handler function to get all contacts
const getAll = async (req, res, next) => {
  // Fetching all documents from the 'contacts' collection
  const result = await mongodb.getDb().db().collection('contacts').find();

  // Converting the result to an array and sending it as JSON response
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// Handler function to get a single contact by ID
const getSingle = async (req, res, next) => {
  // Creating an ObjectId instance from the request parameter 'id'
  const userId = new ObjectId(req.params.id);

  // Fetching a document from the 'contacts' collection with the specified _id
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });

  // Converting the result to an array and sending the first element as JSON response
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// Exporting the getAll and getSingle functions for use in other modules
module.exports = { getAll, getSingle };
