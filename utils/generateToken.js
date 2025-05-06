const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ email: user.email, Id: user.__id },process.env.JWT_KEY);
}

module.exports.generateToken = generateToken;