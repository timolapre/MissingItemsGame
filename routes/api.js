// Api route for database handling
module.exports = function (db) {
    var express = require("express");
    var router = express.Router();

    router.get("/", function (req, res) {
        res.send('alive');
    });

    router.get("/players", function (req, res) {
        db.all("SELECT * FROM players", function (err, row) {
            res.send(row);
        });
    });

    router.get("/winners", function (req, res) {
        db.all("SELECT * FROM players ORDER BY points DESC", function (err, row) {
            res.send(row);
        });
    });

    router.get("/gameinfo", function (req, res) {
        db.all("SELECT * FROM gameinfo WHERE id='" + req.query.level +"'", function (err, row) {
            res.send(row);
        });
    });

    router.get("/answer", function (req, res) {
        db.all("SELECT * FROM players WHERE id = '" + req.session.playerid + "'", function (err, row) {
            res.send(row);
        });
    });

    router.post('/addplayer', function (req, res) {
        var b = req.body;
        db.all("INSERT INTO players (name) VALUES (?)", [String(b.name)], function (err, row) {
            if (err) {
                res.redirect(req.get('referer'));
            } else {
                db.all("SELECT * FROM players where name='"+b.name+"'", function (err, row) {
                    req.session.name = b.name;
                    req.session.playerid = row[0].id;
                    res.redirect('/answer');
                });
            }
        });
    });

    router.post('/changeAnswer', function (req, res) {
        var b = req.body;
        console.log(b.answer);
        db.all("UPDATE players SET answer = '" + b.answer + "' WHERE id = '" + req.session.playerid + "'", function (err, row) {
            if (err) {
                res.redirect(req.get('referer'));
            } else {
                res.redirect(req.get('referer'));
            }
        });
    });

    router.post('/clearPlayers', function (req, res) {
        var b = req.body;
        db.all("DELETE FROM players", function (err, row) {
            if (err) {
                res.redirect(req.get('referer'));
            } else {
                res.redirect(req.get('referer'));
            }
        });
    });

    router.post('/addPoints', function (req, res) {
        var b = req.body;
        console.log(b);
        db.all("UPDATE players SET points = points+" + b.addpoints + " WHERE id = '" + b.playerid + "'", function (err, row) {
            if (err) {
                res.redirect(req.get('referer'));
            } else {
                res.redirect(req.get('referer'));
            }
        });
    });

    return router;
};