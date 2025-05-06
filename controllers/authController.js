const bcrypt = require("bcrypt");
const userModel = require("../models/user/usermodel");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
    try {
        const { email, password, fullname } = req.body;

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