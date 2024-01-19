// Importing the 'express' library to create a router
const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
// Mounting the '/contacts' route by using the 'contacts' module
router.use('/contacts', require('./contacts'));

// Exporting the router to be used in other parts of the application
module.exports = router;
