//selects the quiz button and the element
var startBtn = $('#start-quiz');
var quizEl = $('#quiz');
var resetBtn = $('#reset');

//hides the quiz at the beginning
quizEl.hide();

//sets some global variables
var wins = localStorage.getItem('wins');
var losses = localStorage.getItem('losses');
var secondsLeft = 30;
var correctAnswer = '';
var questionsAsked = 0;

//checks local storage for wins and then sets wins and losses on the screen to their current variable
if (wins == null){
    $('#wins').text('Wins: '+ 0);
}
else {
    $('#wins').text('Wins: '+ wins);
}

if (losses == null){
    $('#losses').text('Losses: '+ 0);
}
else {
    $('#losses').text('Losses: '+ losses);
}
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
    },
    {
        questionText: "This is an example question 4",
        answerOne: "answer 1",
        answerTwo: "answer 2",
        answerThree: "answer 3",
        answerFour: "answer 4",
        correct: "answer 1",
        asked: false
    },
    {
        questionText: "This is an example question 5",
        answerOne: "answer 1",
        answerTwo: "answer 2",
        answerThree: "answer 3",
        answerFour: "answer 4",
        correct: "answer 1",
        asked: false
    },
    {
        questionText: "This is an example question 6",
        answerOne: "answer 1",
        answerTwo: "answer 2",
        answerThree: "answer 3",
        answerFour: "answer 4",
        correct: "answer 1",
        asked: false
    },
    {
        questionText: "This is an example question 7",
        answerOne: "answer 1",
        answerTwo: "answer 2",
        answerThree: "answer 3",
        answerFour: "answer 4",
        correct: "answer 1",
        asked: false
    },
    {
        questionText: "This is an example question 8",
        answerOne: "answer 1",
        answerTwo: "answer 2",
        answerThree: "answer 3",
        answerFour: "answer 4",
        correct: "answer 1",
        asked: false
    },
    {
        questionText: "This is an example question 9",
        answerOne: "answer 1",
        answerTwo: "answer 2",
        answerThree: "answer 3",
        answerFour: "answer 4",
        correct: "answer 1",
        asked: false
    },
    {
        questionText: "This is an example question 10",
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
    questionsAsked = 0;
    secondsLeft = 30;
    startTimer();
    startBtn.hide();
    quizEl.show();
    pullQuestion();
}
//starts the timer, and checks to see if the quiz is over or if the seconds are below 0
function startTimer(){
    var timerInterval = setInterval(function() {
        if (secondsLeft > 0 && questionsAsked >= possibleQuestions.length) {
            clearInterval(timerInterval);
            wins++
            $('#wins').text('Wins: '+ wins);
            localStorage.setItem ('wins', wins);
            endQuiz();
        } else if(secondsLeft <= 0) {
            clearInterval(timerInterval); 
            secondsLeft = 0;
            $('#time-left').text("Time Left: " + secondsLeft);
            losses++;
            $('#losses').text('Losses: '+ losses);
            localStorage.setItem ('losses', losses);
            endQuiz(); 
        } else {
            secondsLeft--;
            $('#time-left').text("Time Left: " + secondsLeft);
        }
       
    }, 1000);
}

//pulls a random question from the array

function pullQuestion(){
    quizEl.children().remove();
    var rndQuestion = possibleQuestions[Math.floor(Math.random()*possibleQuestions.length)];

        if (rndQuestion.asked === false){
        rndQuestion.asked = true;
        var newQuestionEl = $('<ul>');
        newQuestionEl.append('<h3>').text(rndQuestion.questionText);
        
        var answerOne = $('<li>').text(rndQuestion.answerOne).addClass("btn btn-danger:hover col-12 align-self-center");
        var answerTwo = $('<li>').text(rndQuestion.answerTwo).addClass("btn btn-danger:hover col-12 align-self-center");
        var answerThree = $('<li>').text(rndQuestion.answerThree).addClass("btn btn-danger:hover col-12 align-self-center");
        var answerFour = $('<li>').text(rndQuestion.answerFour).addClass("btn btn-danger:hover col-12 align-self-center");
        
        newQuestionEl.append(answerOne, answerTwo, answerThree, answerFour);
        quizEl.append(newQuestionEl);
        correctAnswer = rndQuestion.correct; 
        }
       else if (questionsAsked < possibleQuestions.length){ 
        pullQuestion();
        }
}
//checks to see if the answer to question is correct and adds or subtracts time, then pulls the next question

function checkAnswer(event)  {
    event.preventDefault();
    var chosenAnswer = $(event.target)
    console.log('before if state'+secondsLeft);
    if (correctAnswer === chosenAnswer.text()) {
        secondsLeft = secondsLeft + 5;
        console.log("after correct" +secondsLeft);
    } else {
        secondsLeft = secondsLeft - 15;
        console.log("after false"+secondsLeft);
    }
    questionsAsked++;
        console.log('after questionsAsked++'+secondsLeft);
    chosenAnswer.parent().remove();
   if (questionsAsked < possibleQuestions.length){
    pullQuestion();
    }
}

//ends the quiz by hiding the element, resetting  the seconds left and timer, and resetting .asked to false

function endQuiz () {
    quizEl.children().remove();
    quizEl.hide();
    startBtn.show();
    secondsLeft = 30;
    $('#time-left').text("Time Left: " + secondsLeft);
    correctAnswer = '';
    questionsAsked = 0;
    for (var i=0; i < possibleQuestions.length; i++) {
        possibleQuestions[i].asked = false;
        console.log(possibleQuestions[i].asked);
    }
}

//resets the scoreboard

function resetScore(event) {
    event.preventDefault();
    localStorage.setItem('wins', 0);
    wins = localStorage.getItem('wins');
    $('#wins').text('Wins: '+ wins);
    localStorage.setItem('losses', 0);
    losses = localStorage.getItem('losses');
    $('#losses').text('Losses: '+ losses);
}


startBtn.on('click', startQuiz);
resetBtn.on('click', resetScore);
quizEl.on("click", 'li', checkAnswer);

