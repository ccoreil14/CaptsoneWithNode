//Dependencies
var Promise = require("bluebird");
var User = require('./Public/models/user');
var port = process.env.PORT || 5000;
var app = require('express')();
var server = require('http').Server(app);
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var sio = require('socket.io')(server);

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://user:pass@ds151707.mlab.com:51707/livetest');

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


app.use(session({
    secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
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


//replacing all of one and switching out for another
String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}

sio.on('connect', function (socket) {
    socket.nickname = "Guest";

    socket.on('loggedIn', function (username) {
        socket.nickname = username;
    });

    socket.on('message-sent', function (msg) {
        if (msg.replaceAll(' ', '') != '') {
            sio.emit('send-to-client', socket.nickname + ": " + msg);
        }
    });

    socket.on('join', function (data) {
        //        console.log("joining room: "+data.email);
        socket.join(data.email); // We are using room of socket io
    });

    socket.on('sendRoomMsg', function (data) {
        //            console.log(data);
        sio.sockets.in(data.email).emit('new_room_msg', {
            msg: data.msg,
            roomId: data.email
        });
    });

    socket.on('sendHtml', function (data) {
        socket.join(data.email);
        //        console.log(data);
        sio.sockets.in(data.email).emit('fillPage', {
            dataArray: data.dataArray,
            roomId: data.email
        });
    });

    socket.on('draw', function (params) {
        sio.emit('draw', params);
    });
    
    //    socket.on('changeData', function (data) {
    //        console.log("room: " + data.dataArray[3]);
    //        sio.sockets.in(data.email).emit('changeData', {
    //            dataArray: data.dataArray
    //        });
    //    });
});

server.listen(port);
console.log('The magic happens on port ' + port);