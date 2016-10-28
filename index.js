//Dependencies
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:pass@ds035177.mlab.com:35177/tes2');
var Promise = require("bluebird");
var User = require('./Public/models/user');
var app = require('express')();
var server = require('http').Server(app);
var path = require('path');
var sio = require('socket.io')(server); //We pass in the instance of our http server to socket io

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//Listening
server.listen(process.env.PORT || 5000);

////Public folder creation
app.use(require('express').static(path.join(__dirname, 'Public')));


/////////////////
//////ROUTING////
/////////////////
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

//
///////////////////////////////
//////Socket Code goes here////
///////////////////////////////
//
sio.on('connect', function (socket) {
    socket.on('message-sent', function (msg) {
        sio.emit('send-to-client', msg);
    });
});