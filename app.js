var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

// Insert data into database
db.serialize(function () {
    db.run("CREATE TABLE players (id integer NOT NULL PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), active VARCHAR(1) DEFAULT 1, answer VARCHAR(255), points integer DEFAULT 0)");

    db.run("CREATE TABLE gameinfo (id integer NOT NULL PRIMARY KEY AUTOINCREMENT, amount VARCHAR(255), answer VARCHAR(255))");
    db.run("INSERT INTO gameinfo VALUES (1, 1, 'Schaar')");
    db.run("INSERT INTO gameinfo VALUES (2, 2, 'Kikker, Koe')");
    db.run("INSERT INTO gameinfo VALUES (3, 3, 'Kaas, Ijs, Brood')");
    db.run("INSERT INTO gameinfo VALUES (4, 3, 'Segway, Luchtballon, Vliegtuig')");
    db.run("INSERT INTO gameinfo VALUES (5, 4, 'Boek, Donut, Tas, Taart')");
    db.run("INSERT INTO gameinfo VALUES (6, 4, 'Boek, Bezem, Voetbal, Klok')");
    db.run("INSERT INTO gameinfo VALUES (7, 5, 'Laptop, Telefoon, Sleutel, Kluis, Lamp')");
    db.run("INSERT INTO gameinfo VALUES (8, 5, 'Lamp, Stoel, Toilet, Huis, Afstandsbediening')");

});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api')(db);
var answerRouter = require('./routes/answer');
var adminRouter = require('./routes/admin');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/answer', answerRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
