const express = require("express");
const router = express.Router();
const adminModel = require("../models/admin/admin");


router.get("/",function(req,res){
    res.send("working admin route");
})

console.log(process.env.NODE_ENV);

if(process.env === "development"){
    router.post("/create",function(req,res){
        res.send("working");
    })
}


module.exports = router;