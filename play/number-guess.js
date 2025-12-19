// DOM variables
const guessInput = document.getElementById('answer')
const answerBtn = document.getElementById('answer-btn')
const attemptsLeftElem = document.getElementById('attempts-left')
const guessedNumbers = document.getElementById('guessed-numbers')
const feedbackMsg = document.getElementById('feedback')
const resultMsg = document.getElementById('result')
const gameStartSection = document.getElementById('game-start')
const gameEndSection = document.getElementById('game-end')
const restartBtn = document.getElementById('restart-btn')

// game variables
let targetNumber;
let attemptsRemaining = Number(attemptsLeftElem.innerHTML);
let guessedNumList;

// functions
function generateRandomNumber(min, max) {
    targetNumber = Math.floor(Math.random() * (max - min) + min)
    console.log('target number', targetNumber)
}

function initGame() {
    generateRandomNumber(1, 100);
    guessInput.innerHTML = '';
    attemptsLeftElem.innerHTML = '10';
    attemptsRemaining = Number(attemptsLeftElem.textContent)
    guessedNumbers.innerHTML = '';
    guessedNumList = [];
    feedbackMsg.innerHTML = '';
    gameStartSection.style = 'display: block;';
    gameEndSection.style = 'display: none;';
}

function addGuessedNumber(answer) {
    const toAdd = document.createElement('span');
    toAdd.textContent = answer;
    toAdd.className = 'guessed';
    toAdd.style = 'margin-left: 5px;';
    guessedNumbers.appendChild(toAdd);
    guessedNumList.push(answer);
}

function processAnswer(answer) {
    addGuessedNumber(answer);
    attemptsRemaining --;

    if (answer == targetNumber) {
        endGame(true);
    } else {

        attemptsLeftElem.innerHTML = String(attemptsRemaining);
        if (attemptsRemaining === 0) {
            endGame(false);
        }
        
        if (answer < targetNumber) {
            showFeedback('Guess higher');
        } else {
            showFeedback('Guess lower');
        }
    }
}

function showFeedback(feedback) {
    feedbackMsg.innerHTML = feedback;
}

function showResult(feedback) {
    resultMsg.innerHTML = feedback;
}

function validateInput(toValidate) {
    let num = Number(toValidate);
    if (isNaN(num) || !Number.isInteger(num) || num < 1 || num > 100) {
        showFeedback('Please input an integer between 1 and 100.');
        return false;
    }

    if (guessedNumList.includes(num)) {
        showFeedback('You already guessed that number.');
        return false;
    }

    return true;
    
}

function handleSubmit(input) {
    showFeedback('');
    const isValid = validateInput(input);
    if (isValid) {
        processAnswer(Number(input));
    }
    guessInput.value = '';
    guessInput.focus();
}

function endGame(win) {
    gameStartSection.style = 'display: none;'
    gameEndSection.style = 'display: flex;'

    if (win) {
        showResult(`Great guess! <b>${targetNumber}</b> is the answer. You had ${attemptsRemaining} attempt(s) remaining.`);
    } else {
        showResult(`Too bad. The correct answer is <b>${targetNumber}</b>.`)
    }
}

// event listener

answerBtn.addEventListener('click', () => {handleSubmit(guessInput.value.trim())});
guessInput.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        handleSubmit(guessInput.value.trim());
    }
})

restartBtn.addEventListener('click', () => {initGame()});

initGame();

// console.log(Number.isInteger(2));