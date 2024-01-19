// Define a function 'awesomeFunction' that takes 'req', 'res', and 'next' as parameters and sends the response 'Viriya Duggan'
const awesomeFunction = ((req, res, next) => {
    res.send('Viriya Duggan');
});

// Define a function 'returnAnotherPerson' that takes 'req', 'res', and 'next' as parameters and sends a JSON response 'Super awesome person'
const returnAnotherPerson = ((req, res, next) => {
    res.json('Super awesome person');
});

// Export the two functions as part of an object to be used in other modules
module.exports = {awesomeFunction, returnAnotherPerson};

