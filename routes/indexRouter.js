const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("register", { error: "", message: "" });
});

router.get("/login", (req, res) => {
    res.render("login", { error: "", message: "" });
});

module.exports = router;