var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var compression = require('compression');


var config = require("./config");

var app = express();

var initializeDatabases = require('./dbs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Initialize session
app.use(session({
    secret: "judge-sheet-secret",
    resave: false,
    saveUninitialized: true
}));
app.use(compression())
app.use(express.static(__dirname + "/../public/"));

initializeDatabases(function(err, dbs) {
    if (err) {
      console.error('Failed to make all database connections!');
      console.error(err);
      process.exit(1);
    }
    require("./routes")(app,dbs);

    app.listen(config.port, function () {
        console.log("Server running at http://localhost:" + config.port);
    });
});