var socket = null;

function main() {
    $('#boxYo').hide();
    socket = io();
    sendSocketMessage();
    iGotTheMessage();
}

function sendSocketMessage() {
    $('#btnSub').on('click', function () {
        var msg = $('#textWindow').val();
        socket.emit('message-sent', msg);
        $('#textWindow').val('');
    });
}

function iGotTheMessage() {
    socket.on('send-to-client', function (msg) {
        console.log(msg);
        $('#messages').append($('<li>').text(msg));
        $('li').addClass('list-group-item');
    });
}

function setNickname(username) {
    socket.emit('loggedIn', username);
}

main();


var chatIsOpen = false;

String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}

function minMax(theId, studentEmail, username) {
    var id = theId.replaceAll(' ', '_');
    try {
        console.log("toggle: " + id);
        var m = document.getElementById(id).value;
        $("#" + id).toggle();
    } catch (err) {
        var emailId = studentEmail.replace('@', '');
        emailId = emailId.replace('.', '');
        $("#chatBoxArea").append("<div id='" + id + "' class='chatBox ui-widget-content '> <ul id='messages" + emailId + "'></ul> <form action='' class='clientText' onsubmit='return false;'><div class='input-group'> <input id='textWindow" + emailId + "' class='form-control' autocomplete='off' /> <div class='input-group-btn'><button id='btnSub' type='button' onclick=\"sendRoomMessage('" + studentEmail + "' , ' " + id + " ', '"+username+"' )\" class='btn btn-default'>Send</button> </div> </div> </form> </div>");
        $("#" + id).draggable();
    }
}

function joinRoom(studentEmail) {
    socket.emit('join', {
        email: studentEmail
    });
}

function sendRoomMessage(studentEmail, chatBoxId, username) {
    var emailId = studentEmail.replace('@', '');
    emailId = emailId.replace('.', '');
    var roomMsg = document.getElementById('textWindow' + emailId).value;
    socket.emit('sendRoomMsg', {
        email: studentEmail,
        msg: username+": "+roomMsg
    });
}

socket.on("new_room_msg", function (data) {
    var emailId = data.roomId.replace('@', '');
    emailId = emailId.replace('.', '');
    $("#messages" + emailId).append("<li class='list-group-item'>" + data.msg + "</li>");
    document.getElementById("textWindow" + emailId).value = '';

});

function sharePage(studentEmail){
    var htmlPage = "<html><h1>Howdy my friend</h1></html>";
    socket.emit('sendHtml', {
        email: studentEmail,
        html: htmlPage
    });
}

socket.on("fillPage", function (data){
    console.log(data);
    toggleModal('studentModal');
    $('#siteHtml').append(data.html);
});


$(function () {
    $('#boxYo').hide();
    $("#boxYo").draggable();
});