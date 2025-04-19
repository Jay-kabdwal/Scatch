const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const db = require("./config/mongoose-connection");
const adminsRouter = require("./routes/adminsRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");


const app = express();
app.use(express.json());
app.use(cookieParser);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminsRouter);
app.use("/product", productsRouter);
app.use("/user", usersRouter);

app.listen(3000)