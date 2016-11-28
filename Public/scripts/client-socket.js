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
        var newChatBox = $("<div id='" + id + "' class='chatBox ui-widget-content '><button onclick=\"(minMax('" + id + "','"+studentEmail+"','"+username+"'))\">X</button><h4>" + theId + "</h4> <ul id='messages" + emailId + "'></ul> <form action='' class='clientText' onsubmit='return false;'><div class='input-group'> <input id='textWindow" + emailId + "' class='form-control' autocomplete='off' /> <div class='input-group-btn'><button id='btnSub' type='button' onclick=\"sendRoomMessage('" + studentEmail + "' , ' " + id + " ', '" + username + "' )\" class='btn btn-default'>Send</button> </div> </div> </form> </div>");
        newChatBox.css({
            top: 150,
            left: 200
        });
        $("#chatBoxArea").append(newChatBox);
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
        msg: username + ": " + roomMsg
    });
}

socket.on("new_room_msg", function (data) {
    var emailId = data.roomId.replace('@', '');
    emailId = emailId.replace('.', '');
    $("#messages" + emailId).append("<li class='list-group-item'>" + data.msg + "</li>");
    document.getElementById("textWindow" + emailId).value = '';

});

function sharePage(studentEmail, mockPageType) {
    var dataArray = [0, 0, 0, mockPageType];

    if (mockPageType.includes('rect')) {
        dataArray[0] = document.getElementById('widthInput').value;
        dataArray[1] = document.getElementById('lengthInput').value;

    } else if (mockPageType.includes('cube')) {
        dataArray[0] = document.getElementById('widthInput').value;
        dataArray[1] = document.getElementById('lengthInput').value;
        dataArray[2] = document.getElementById('heightInput').value;

    } else {
        dataArray[0] = document.getElementById('radiusInput').value;

    }

    //    joinRoom(studentEmail);
    socket.emit('sendHtml', {
        email: studentEmail,
        dataArray: dataArray
    });
}

socket.on("fillPage", function (data) {
    console.log("fillpage");
    $('#siteHtml').empty();
    var mockPageType = data.dataArray[3];

    if (mockPageType.includes('rect')) {

        $('#siteHtml').append('<iframe src="/mockRect" id="siteHtml"></iframe>');

    } else if (mockPageType.includes('cube')) {

        $('#siteHtml').append('<iframe src="/mockCube" id="siteHtml"></iframe>');

    } else if (mockPageType.includes('circ')) {

        $('#siteHtml').append('<iframe src="/mockCirc" id="siteHtml"></iframe>');

    } else {

        $('#siteHtml').append('<iframe src="/mockSphere" id="siteHtml"></iframe>');

    }

    $('#studentModal').show();
    //    socket.emit("changeData", {
    //        email: data.email,
    //        dataArray: data.dataArray
    //    });
});

//socket.on("changeData", function (data) {
//    console.log("change yo");
//    var mockPageType = data.dataArray[3];
//
//    if (mockPageType.includes('rect')) {
//
//        document.getElementById('widthInput').value = data.dataArray[0];
//        document.getElementById('lengthInput').value = data.dataArray[1];
//
//    } else if (mockPageType.includes('cube')) {
//
//        document.getElementById('widthInput').value = data.dataArray[0];
//        document.getElementById('lengthInput').value = data.dataArray[1];
//        document.getElementById('heightInput').value = data.dataArray[2];
//
//    } else {
//        console.log("update");
//        document.getElementById('radiusInput').value = data.dataArray[0];
//
//    }
//
//});



function isDrawing() {
    socket.emit("draw", canvasInfo);
};

socket.on("draw", function (params) {
    //      console.log(params);
    ctx.fillRect(params[2], params[4], 4, 4);
    if (params[6] === 'down') {
        if (params[5]) {
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.fillRect(params[2], params[4], 4, 4);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (params[6] === 'up' || params[6] === "out") {
        flag = false;
    }
    if (params[6] === 'move') {
        if (params[0]) {
            prevX = canvasInfo[1];
            prevY = canvasInfo[3];
            currY = canvasInfo[4];
            currX = canvasInfo[2];
            draw();
        }
    }
});




$(function () {
    $('#boxYo').hide();
    $("#boxYo").draggable();
});