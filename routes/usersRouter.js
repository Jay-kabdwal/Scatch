const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// Render register page
router.get("/", (req, res) => {
  res.render("register", { error: "", message: "" });
});

// Render login page
router.get("/login", (req, res) => {
  res.render("login", { error: "", message: "" });
});

// Handle post requests
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
