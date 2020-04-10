var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin');
});

router.get('/game', function (req, res, next) {
    res.render('game');
});

router.get('/game2', function (req, res, next) {
    res.render('game2');
});


router.get('/answers', function (req, res, next) {
    res.render('answers');
});

module.exports = router;
