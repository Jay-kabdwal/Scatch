const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isloggedIn');
const Product = require('../Models/product/productmodel');
let ownerModel = require("../models/admin/admin");

router.get("/", async (req, res) => {
  res.send("Everything just fine");
});

// DEV routes
if (process.env.NODE_ENV == "development") {
  try {
    router.post("/create", async (req, res) => {
      let { fullname, email, password, contact } = req.body;
      let owners = await ownerModel.find();
      if (owners.length > 0) {
        res.send({
          response: "Their can be only 1 owner",
        });
        return;
      } else {
        let createdOwner = await ownerModel.create({
          fullname,
          email,
          password,
          contact,
        });
        res.send(createdOwner);
      }
    });
  } catch (err) {
    res.send(err.message);
  }
}

// Admin dashboard route
router.get('/admin', isLoggedIn, async (req, res) => {
  try {
    const products = await Product.find();
    res.render('admin', { products });
  } catch (error) {
    req.flash('error', 'Failed to load products');
    res.redirect('/');
  }
});

// Admin create product page
router.get('/create', isLoggedIn, (req, res) => {
  res.render('create-product', { error: '', message: '' });
});

// Admin update product page
router.get('/update/:id', isLoggedIn, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('update-product', { product });
  } catch (error) {
    req.flash('error', 'Product not found');
    res.redirect('/owner/admin');
  }
});

// Admin update product handler
router.post('/update/:id', isLoggedIn, async (req, res) => {
  try {
    const { name, price, discount } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      discount
    });
    req.flash('message', 'Product updated successfully');
    res.redirect('/owner/admin');
  } catch (error) {
    req.flash('error', 'Failed to update product');
    res.redirect('/owner/admin');
  }
});

// Admin delete product
router.post('/delete/:id', isLoggedIn, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    req.flash('message', 'Product deleted successfully');
    res.redirect('/owner/admin');
  } catch (error) {
    req.flash('error', 'Failed to delete product');
    res.redirect('/owner/admin');
  }
});

module.exports = router;