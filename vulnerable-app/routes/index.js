var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    const name = req.query.q || 'Bob';
    res.render('index', {title: 'Express', name: name});
});

module.exports = router;
