// Import Express module
const express = require('express');
const router = express.Router();

// Greeting route
router.get('/hello', function (req, res) {
    res.send('Hello ' + req.user.username + '!');
});

module.exports = router;
