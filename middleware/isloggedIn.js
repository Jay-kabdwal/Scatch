
const jwt = require("jsonwebtoken");
const userModel = require("../models/user/usermodel");

module.exports = async (req,res,next) => {
    if(!req.cookies.token){
        req.flash("error, You need to login first");
        return res.redirect("/login");
    }
    try{
        const decode = jwt.verify(req.cookies.token , process.env.JWT_KEY);
        const user = await userModel.findOne({email:decode.email}).select("-password");
        req.user = user;
        next();
    }catch(err){
        req.flash("error something went wrong");
        res.redirect("/login");
    }
}