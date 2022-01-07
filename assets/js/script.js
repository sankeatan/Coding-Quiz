//selects the quiz button and the element
var startBtn = $('#start-quiz');
var quizEl = $('#quiz');

//hides the quiz at the beginning
quizEl.hide();

//sets some global variables
var wins = 0;
var losses = 0;
var secondsLeft = 30;
var correctAnswer = '';
var questionsAsked = 0;
var quizOver = true;

//selects and sets wins and losses on the screen to their current variable
$('#wins').text('Wins: '+ wins);
$('#losses').text('Losses: '+ losses);
$('#time-left').text("Time Left: " + secondsLeft);

//array of possible questions, their corresponding possible answers, the correct answer, and if the question has been asked

var possibleQuestions = [
    {
        questionText: "This is example question 1",
        answerOne: "answer 1",
        answerTwo: "answer 2",
        answerThree: "answer 3",
        answerFour: "answer 4",
        correct: "answer 1",
        asked: false
    },
    {
        questionText: "This is an example question 2",
        answerOne: "answer 1",
        answerTwo: "answer 2",
        answerThree: "answer 3",
        answerFour: "answer 4",
        correct: "answer 1",
        asked: false
    },
        
    {
        questionText: "This is an example question 3",
        answerOne: "answer 1",
        answerTwo: "answer 2",
        answerThree: "answer 3",
        answerFour: "answer 4",
        correct: "answer 1",
        asked: false
    }
    ]   

    //start quiz function that runs when the start button is clicked
function startQuiz(event) {
    event.preventDefault();
    //sets quiz over to false
    quizOver = false;
    startBtn.hide();
    quizEl.show();
    startTimer();
    pullQuestion();
    quizEl.on("click", 'li', checkAnswer);
}
//starts the timer, and chekcs to see if the quiz is over or if the seconds are below 0
function startTimer(){
    var timerInterval = setInterval(function() {
       
        if (quizOver == true) {
            var tempTime = secondsLeft;
            clearInterval(timerInterval);
            secondsLeft = tempTime;
        } else if(secondsLeft <= 0) {
            secondsLeft === 0;
            $('#time-left').text("Time Left: " + secondsLeft);
            endQuiz();
            clearInterval(timerInterval); 
        } else {
        $('#time-left').text("Time Left: " + secondsLeft);
        secondsLeft--;
        }
       
    }, 1000);
}

//pulls a random question from the array

function pullQuestion(){
    var rndQuestion = possibleQuestions[Math.floor(Math.random()*possibleQuestions.length)];
    if (questionsAsked === possibleQuestions.length)
    {
        endQuiz();
    }
    else if (rndQuestion.asked == false) {
        var newQuestion = $('<ul>');
        newQuestion.append('<h3>').text(rndQuestion.questionText);
        quizEl.append(newQuestion);
        
        var answerOne = $('<li>').text(rndQuestion.answerOne).addClass("btn btn-danger:hover col-12 align-self-center");
        var answerTwo = $('<li>').text(rndQuestion.answerTwo).addClass("btn btn-danger:hover col-12 align-self-center");
        var answerThree = $('<li>').text(rndQuestion.answerThree).addClass("btn btn-danger:hover col-12 align-self-center");
        var answerFour = $('<li>').text(rndQuestion.answerFour).addClass("btn btn-danger:hover col-12 align-self-center");
        
        newQuestion.append(answerOne, answerTwo, answerThree, answerFour);
        quizEl.append(newQuestion);
        correctAnswer = rndQuestion.correct;
        rndQuestion.asked = true;
        questionsAsked++;
        }
    else pullQuestion();
    }

//checks to see if the answer to question is correct and adds or subtracts time, then pulls the next question

function checkAnswer(event)  {
    event.preventDefault();
    var chosenAnswer = $(event.target)
    if (correctAnswer === chosenAnswer.text()) {
        secondsLeft = secondsLeft + 5;
    } else {
        secondsLeft = secondsLeft - 5;
    }

    chosenAnswer.parent().remove();
    pullQuestion();
}

//ends the quiz by hiding the element, updating the scoredboard.

function endQuiz () {
    quizEl.hide();
    quizOver = true;
    console.log(secondsLeft);
    if (secondsLeft > 0) {
        wins++
        $('$wins').text('Wins: '+ wins);
    } else {
         losses++;
        $('#losses').text('Losses: '+ losses);
    }
    var secondsLeft = 30;
    var correctAnswer = '';
    var questionsAsked = 0;
    for (i=0; i<possibleQuestions.length; i++) {
        possibleQuestions[i].asked = false;
    }
}


startBtn.on('click', startQuiz);

