//Dependencies
var app = require('express')();
var server = require('http').Server(app);
var path = require('path');
var sio = require('socket.io')(server); //We pass in the instance of our http server to socket io

//Listening
server.listen(process.env.PORT || 5000);

////Public folder creation
app.use(require('express').static(path.join(__dirname, 'assets')));


/////////////////
//////ROUTING////
/////////////////
app.get('/', function (req, res) {
    console.log("made it to home page");
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