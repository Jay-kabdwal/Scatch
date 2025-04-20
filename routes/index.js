const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        error: '',
        message: ''
    });
});

module.exports = router;