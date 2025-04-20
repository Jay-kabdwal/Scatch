const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const db = require("./config/mongoose-connection");
const adminsRouter = require("./routes/adminsRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const index = require("./routes/index");

const app = express();

// Set view engine
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookieParser()); // Fixed: Call cookieParser as a function
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/admin", adminsRouter);
app.use("/product", productsRouter);
app.use("/user", usersRouter);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});