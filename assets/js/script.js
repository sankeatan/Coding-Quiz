var startBtn = $('#start-quiz');
var quizEl = $('#quiz');

var wins = 0;
var losses = 0;
var secondsLeft = 5;

$('#wins').text('Wins: '+ wins);
$('#losses').text('Losses: '+ losses);
function startQuiz(event) {
    event.preventDefault();
    startBtn.hide();
    var question =$('<h3>').text("test");
    quizEl.append(question);
    for (i=0; i < 4; i++) {
        var answer = $('<button>').text("question")
        quizEl.append(answer);
    }
    startTimer();
}

function startTimer(){
    var timerInterval = setInterval(function() {
        secondsLeft--;
        $('#time-left').text(secondsLeft);

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            losses++;
            $('#losses').text('Losses: '+ losses);
        }
        else {
            wins++;
            $('#wins').text('Wins: '+ wins);
        }
    }, 1000);
}

startBtn.on('click', startQuiz);

