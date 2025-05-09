const express = require("express");
const router = express.Router(); // Changed from express() to express.Router()
const { registerUser, loginUser, logoutUser } = require('../controllers/authController'); // Fixed path case

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;