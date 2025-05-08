const bcrypt = require("bcrypt");
const userModel = require("../models/user/usermodel");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
    try {
        const { email, password, fullname } = req.body;

        const olduser = await userModel.findOne({ email });
        if (olduser) {
            return res.render("register", {
                error: "User already exists, please login",
                message: ""
            });
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
        res.redirect("/login");
    } catch (err) {
        res.render("register", {
            error: err.message,
            message: ""
        });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.render("login", {
                error: "User not found, please register",
                message: ""
            });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.render("login", {
                error: "Invalid credentials",
                message: ""
            });
        }

        const token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/dashboard");
    } catch (err) {
        res.render("login", {
            error: err.message,
            message: ""
        });
    }
};
