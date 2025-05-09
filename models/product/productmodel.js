const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: Buffer },
    bgcolor: { type: String },
    panelcolor: { type: String },
    textcolor: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);