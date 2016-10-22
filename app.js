//Dependencies
var app = require('express')();
//var http = require('http').Server(app);
var path = require('path');
app.set('port', (process.env.PORT || 3000));
//var sio = require('socket.io')(app.get('port')); //We pass in the instance of our http server to socket io


//Public folder creation
app.use(require('express').static(path.join(__dirname, 'assets')));


///////////////
////ROUTING////
///////////////
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});


/////////////////////////////
////Socket Code goes here////
/////////////////////////////

//sio.on('connect', function (socket) {
//    socket.on('message-sent', function (msg) {
//        sio.emit('send-to-client', msg);
//    });
//});



app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});




//Listening locally

//http.listen(3000, function () {
//    console.log('Server listening on 3000...');
//});