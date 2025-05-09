const express = require('express');
const router = express.Router();
const Product = require('../Models/product/productmodel'); // Changed from productSchema to Product
const islogeedin = require('../middleware/isloggedIn');

router.get("/", function (req, res) {
    let error = req.flash("error");
    let message = req.flash("message")
    res.render("index", { message, error, loggedin: false });
});

router.get('/shop', islogeedin, async function (req, res) {
    try {
        let products = await Product.find(); // Using Product model instead of productSchema
        res.render('shop', { products });
    } catch (error) {
        req.flash('error', 'Failed to load products');
        res.redirect('/');
    }
});

router.get('/cart/:userid', islogeedin, (req, res) => {
    res.render('cart');
});

module.exports = router;