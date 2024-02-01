const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

// GET Request Controllers (Read)

const getAll = async (req, res, next) => {
  // #swagger.description = 'Getting all contacts from our database'
  try {
    const result = await mongodb.getDb().db().collection("contacts").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch {
    console.log("Error on getting all contacts", err);
  }
};

const getSingle = async (req, res, next) => {
  // #swagger.description = 'Getting a single contact from our database using id'
  const userId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    console.log("Error on getting a single contact", err);
  }
};

// POST Request Controllers (Create)
const createContact = async (req, res) => {
  // #swagger.description = 'Creating a single contact to our database'
  try {
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
      return res.status(201).json(response);
    } else {
      return res
        .status(500)
        .json(response.error || "Error occurred while creating the contact.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT Request Controllers (Update)
const updateContact = async (req, res) => {
  // #swagger.description = 'Updating a single contact to our database'
  try {
    const userId = new ObjectId(req.params.id);
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

    if (response.modifiedCount > 0) {
      return res.status(204).send();
    } else {
      return res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the contact."
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE Request Controllers (Delete)
const deleteContact = async (req, res) => {
  // #swagger.description = 'Deleting a single contact to our database'
  try {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .deleteOne({ _id: userId }, true);

    if (response.deletedCount > 0) {
      return res.status(200).send();
    } else {
      return res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the contact."
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createContact,
  getAll,
  getSingle,
  updateContact,
  deleteContact,
};
