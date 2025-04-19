const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path")
const db = require("./config/mongoose-connection")

const app = express();
app.use(express.json());
app.use(cookieParser);
app.use(express.urlencoded({ extended : true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.send("hey");
});

app.listen(4000)