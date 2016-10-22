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

main();


var chatIsOpen = false;

function minMax() {
    if (chatIsOpen !== true) {
        $('#boxYo').show();
        chatIsOpen = true;
    } else {
        $('#boxYo').hide();
        chatIsOpen = false;
    }
}

 $( function() {
    $( "#boxYo" ).draggable();
  } );