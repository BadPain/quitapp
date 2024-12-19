let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_WIN = new Audio('/sounds/ende.mp3');
let AUDIO_RIGHT = new Audio('/sounds/smw_coin.wav');
let AUDIO_WRONG = new Audio('/sounds/fail.mp3');

function init() {
    totalQuestions()
}

function showquestion() {
    if (currentQuestion >= questions.length) {
        showEndScreen();
    } else {
        showNextQuestion();
    }
}

function totalQuestions() {
    document.getElementById('totalQuestions').innerHTML = questions.length;
    document.getElementById('allQuestions').innerHTML = questions.length;

    questionAmount()
    showquestion();
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions++;
        AUDIO_RIGHT.play();
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_WRONG.play();
    }
    document.getElementById('nextQuestion').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion <= questions.length) {
        document.getElementById('nextQuestion').disabled = true;
        setTimeout(() => {
            resetAnswerButtons();
            questionAmount();
            showquestion();
        }, 750);
    }
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function questionAmount() {
    document.getElementById('questionNumber').innerHTML = currentQuestion + 1;
}

function tryAgain() {
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('question-game').style.display = 'block';
    document.getElementById('progressBar').style.display = 'block';
    document.getElementById('mainProgressBar').style.display = 'block';
    document.getElementById('background-image').src = './img/main/background.jpg';
    rightQuestions = 0;
    currentQuestion = 0;
    setTimeout(() => {
        init();
    }, 500);

}

function showEndScreen() {
    document.getElementById('endScreen').style.display = 'block';
    document.getElementById('endScreenText').innerHTML = 'Du hast alle Fragen beantwortet!';
    document.getElementById('question-game').style.display = 'none';
    document.getElementById('progressBar').style.display = 'none';
    document.getElementById('mainProgressBar').style.display = 'none';
    document.getElementById('amountOfQuestions').innerHTML = rightQuestions;
    document.getElementById('background-image').src = './img/main/win.png';
    AUDIO_WIN.play();
}

function showNextQuestion() {
    let percent = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = `${percent}%`;
    let question = questions[currentQuestion];
    document.getElementById('question-text').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

