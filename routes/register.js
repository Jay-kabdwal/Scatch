const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user/usermodel");

router.get("/", (req, res) => {
  res.render("register", {
    error: "",
    message: "",
  });
});

router.post("/register", (req, res) => {
  try {
    let { email, password, fullname } = req.body();

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) res.send(err);
        else {
          const user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          let token =jwt.sign({ email, Id: user.__id });
          res.cookie("token",token);
          res.send("user created succesfully");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
