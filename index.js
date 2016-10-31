//Dependencies
var Promise = require("bluebird");
var User = require('./Public/models/user');
var port = process.env.PORT || 5000;
var app = require('express')();
var server = require('http').Server(app);
var path = require('path');
var passport = require('passport');
var flash    = require('connect-flash');
var sio = require('socket.io')(server); 

var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://user:pass@ds139327.mlab.com:39327/test3');

 require('./config/passport')(passport);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser()); // read cookies (needed for auth)

app.set('view engine', 'ejs'); 

//Listening


////Public folder creation
app.use(require('express').static(path.join(__dirname, 'Public')));

var pathYO = __dirname;


app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

/////////////////
//////ROUTING////
/////////////////
require('./Public/routes.js')(app, passport, path, pathYO);


///////////////////////////////
//////Socket Code goes here////
///////////////////////////////

sio.on('connect', function (socket) {
    socket.on('message-sent', function (msg) {
        sio.emit('send-to-client', msg);
    });
});

server.listen(port);
console.log('The magic happens on port ' + port);