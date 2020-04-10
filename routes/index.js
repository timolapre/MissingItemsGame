var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var id = 0;
    var name = "";
    if(req.session.playerid){
        id = req.session.playerid;
        name = req.session.name;
    }
    res.render('index', {id, name});
});

module.exports = router;
