var questionsAnswered = 0;
function checkAnswer(answerNum, trueAnswer) {
    var answerCovers = document.getElementsByClassName("answerBoxCover");
    var answers = document.getElementsByClassName("answerDescrip");
    var inputs = document.getElementsByClassName("userAnswer");
    answerCovers[answerNum].style.visibility = 'hidden';
    answers[answerNum].style.visibility = 'visible';
    inputs[answerNum].setAttribute("readonly", "true");
    var userAnsr = inputs[answerNum].value;
    if (userAnsr === trueAnswer) {
        $(inputs[answerNum]).addClass("correct");
    } else {
        $(inputs[answerNum]).addClass("incorrect");
    }
    console.log(userAnsr +" : "+ trueAnswer);
    questionsAnswered++;
    if(questionsAnswered >= 10 ){
        document.getElementById('submitScore').style.visibility = "visible";
        var numCorrect = document.getElementsByClassName('correct');
        document.getElementById('finalScore').value = numCorrect.length;
        
    }
}

