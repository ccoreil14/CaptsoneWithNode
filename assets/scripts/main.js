function toggleMenu(boxInsidesId){
    var dropdown = document.getElementById(boxInsidesId);
    if (dropdown.style.visibility === 'collapse'){
        console.log("visible "+boxInsidesId);
        dropdown.style.visibility = 'visible';
    }else{
        dropdown.style.visibility = 'collapse';
    }
}