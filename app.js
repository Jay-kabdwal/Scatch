const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");
const adminsRouter = require("./routes/adminsRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/indexRouter");
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config()

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(flash());

app.use("/", indexRouter);
app.use("/user", usersRouter );
app.use("/admin", adminsRouter);
app.use("/product", productsRouter);

// Error handler for 404
app.use((req, res, next) => {
    res.status(404).render('error', { 
        error: 'Page not found',
        message: '' 
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});