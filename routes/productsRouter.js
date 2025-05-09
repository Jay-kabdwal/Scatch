const express = require("express");
const router = express.Router();
const Product = require('../Models/product/productmodel'); // Fixed casing to match directory
const upload = require('../config/multer-config');
const isLoggedIn = require('../middleware/isloggedIn'); // Added auth middleware

// Create product route with auth protection
router.post('/create', isLoggedIn, upload.single("image"), async (req, res) => {
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        const product = await Product.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });

        req.flash("message", "Product created successfully");
        res.redirect("/owner/admin");
    } catch (error) {
        console.error("Product creation error:", error);
        req.flash("error", "Failed to create product");
        res.redirect("/owner/admin");
    }
});

module.exports = router;