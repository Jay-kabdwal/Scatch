// Core dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

// Environment variables
require('dotenv').config();

// Database connection
const db = require('./config/mongoose-connection');

// Route imports
const indexRoutes = require('./routes/indexRouter');
const userRoutes = require('./routes/usersRouter');
const productRoutes = require('./routes/productsRouter');
const ownerRoutes = require('./routes/adminsRouter');

// Initialize express
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));
app.use(flash());

// Static files and view engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/owner', ownerRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});