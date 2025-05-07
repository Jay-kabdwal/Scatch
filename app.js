const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");
const adminsRouter = require("./routes/adminsRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const register = require("./routes/register");
const login = require("./routes/login");

require("dotenv").config()

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", register);
app.use("/user", login);
app.use("/admin", adminsRouter);
app.use("/product", productsRouter);
app.use("/user",  register);


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});