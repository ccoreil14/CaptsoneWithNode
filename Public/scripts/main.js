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