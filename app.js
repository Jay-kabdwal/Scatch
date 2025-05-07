const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");
const adminsRouter = require("./routes/adminsRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

require("dotenv").config()

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", usersRouter);
app.use("/user", usersRouter );
app.use("/admin", adminsRouter);
app.use("/product", productsRouter);
// app.use("/user",  register);


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});