const bcrypt = require("bcrypt");
const userModel = require("../models/user/usermodel");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    const olduser = await userModel.findOne({ email });
    if (olduser) {
      res.status(401).send({ message: "already exist please login" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      password: hash,
      fullname,
    });

    const token = generateToken(user);
    res.cookie("token", token);
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400)
      .send({ message: "please register first" });
    }

    bcrypt.compare(password,user.password, function(err,result){
        if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            res.send("logged in");
        }else{
            return res.send("email or password incorrect");
        }
    })

  } catch (err) {
    res.send(err.message);
  }
};
