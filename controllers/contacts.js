// Importing the MongoDB connection and ObjectId from the 'mongodb' library
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Handler function to get all contacts
const getAll = async (req, res, next) => {
  // Fetching all documents from the 'contacts' collection
  const result = await mongodb.getDb().db().collection("contacts").find();

  // Converting the result to an array and sending it as JSON response
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
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
    .collection("contacts")
    .find({ _id: userId });

  // Converting the result to an array and sending the first element as JSON response
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

// CREATE Request Controllers (Create Contact)
const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the contact."
      );
  }
};

// PUT Request Controllers (Update Contact)
const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the contact."
      );
  }
};

// DELETE Request Controllers (Delete Contact)
const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json("Contact not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

// Exporting the getAll and getSingle functions for use in other modules
module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
