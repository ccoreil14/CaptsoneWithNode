var shapeOffsetX = 363;
var shapeOffsetY = 380;

function toggleMenu(boxInsidesId) {
    var dropdown = document.getElementById(boxInsidesId);
    if (dropdown.style.visibility === 'collapse') {
        console.log("visible " + boxInsidesId);
        dropdown.style.visibility = 'visible';
    } else {
        dropdown.style.visibility = 'collapse';
    }

}



function rectArea(x, y) {
    var answer = x * y;
    return answer.toFixed(2);
}

function perimeter(x, y) {
    var answer = (x * 2) + (y * 2);
    return answer.toFixed(2);
}

function circArea(r) {
    var answer = 3.14 * (r * r);
    return answer.toFixed(2);
}

function circumfrence(r) {
    var answer = 3.14 * (r * 2);
    return answer.toFixed(2);
}

function prismSurfaceArea(x, y, z) {
    var answer = 2 * ((x * y) + (y * z) + (z * x));
    return answer.toFixed(2);
}

function prismVolume(x, y, z) {
    var answer = (x * y * z);
    return answer.toFixed(2);
}

function sphereSurfaceArea(r) {
    var answer = (4 * 3.14) * (r * r)
    return answer.toFixed(2);
}

function sphereVolume(r) {
    var answer = ((4 / 3) * 3.14) * (r * r * r);
    return answer.toFixed(2);
}

function medalGot() {
    alert("You made an Account. Hurray!");
    user.local.userMedals.medal1 = true;
}

function scrollDown(id) {
    var objDiv = document.getElementById(id);
    objDiv.scrollTop = objDiv.scrollHeight;
}

(function go() {
    $(".modal").hide();

})();




function hideModal(){
    $('#studentModal').hide();
}



//canvas stuff
var canvasInfo = [false, 0, 0, 0, 0, false, "out"];
//      flag,prevX,currX,prevY,currY,dot_flag

var canvas = document.getElementById('can');
var ctx = canvas.getContext("2d");
var flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

//initCanvas();

function initCanvas() {

    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}



function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
}



function findxy(res, e) {
    canvasInfo[6] = res;
    if (res === 'down') {
        canvasInfo[1] = prevX = currX;
        canvasInfo[3] = prevY = currY;
        canvasInfo[2] = currX = e.clientX - canvas.offsetLeft;
        canvasInfo[4] = currY = e.clientY - canvas.offsetTop;

        canvasInfo[0] = flag = true;
        canvasInfo[5] = dot_flag = true;
        if (dot_flag) {
            canvasInfo[5] = dot_flag = false;
        }
    }
    if (res === 'up' || res === "out") {
        canvasInfo[0] = flag = false;
    }
    if (res === 'move') {
        if (flag) {
            canvasInfo[1] = prevX = currX;
            canvasInfo[3] = prevY = currY;
            canvasInfo[2] = currX = e.clientX - canvas.offsetLeft;
            canvasInfo[4] = currY = e.clientY - canvas.offsetTop;
            //            draw();
        }
    }
    isDrawing();
}

function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}