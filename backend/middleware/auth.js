
// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('JWT authentication is disabled');
    next();
};

