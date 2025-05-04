const express = require("express");
const router = express.Router();
const adminModel = require("../models/admin/admin");

if (process.env === "development") {
  router.post("/create", async function (req, res) {
    let owners = await adminModel.find();
    if (owners.length > 0) {
      return res
      .status(503)
      .send("already exist");
    }

    let {fullname , email , password } =req.body;

    let createdowner = await adminModel.create({
        fullname,
        email,
        password,
    });
      return res.status(200).send(createdowner);

  });
}

router.get("/", function (req, res) {
  res.send("working admin route");
});

console.log(process.env.NODE_ENV);

module.exports = router;
