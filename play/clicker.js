// DOM variables
const clickBtn = document.getElementById('clicker');
const scoreboard = document.getElementById('score');
const timer = document.getElementById('timer');
const gameStartSection = document.getElementById('game-start')
const gameEndSection = document.getElementById('game-end')
const resetBtn = document.getElementById('reset-btn')

// game variables
let gameActive;
let currentScore = 0;
let givenTime;

// functions

function initGame() {
    gameActive = false;
    currentScore = 0;
    givenTime = 10;
    scoreboard.innerHTML = currentScore;
    timer.innerHTML = givenTime;
    gameStartSection.style = 'display: block;'
    gameEndSection.style = 'display: none;'
}

function startGame () {
    if (!gameActive) {
        gameActive = true;
        startTimer();
    }
}

function updateScore () {
    currentScore++;
    scoreboard.innerHTML = currentScore;
}

async function startTimer () {
    if (gameActive) {
        let timeleft = givenTime;

        while (timeleft > 0) {
            timer.innerHTML = timeleft;

            await new Promise(resolve => setTimeout(resolve, 1000));

            timeleft--;
        }

        endGame();
    }
}

function endGame() {
    gameActive = false;
    gameStartSection.style = 'display: none;';
    gameEndSection.style = 'display: block;';
}

// event listener
clickBtn.addEventListener('click', () => {
    startGame();
    updateScore();
});
resetBtn.addEventListener('click', () => {initGame();});


initGame();