const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;