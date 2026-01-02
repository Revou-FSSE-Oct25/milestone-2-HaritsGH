// DOM variables
const clickBtn = document.getElementById('clicker');
const scoreboard = document.getElementById('score');
const timer = document.getElementById('timer');
const gameStartSection = document.getElementById('game-start')
const gameEndSection = document.getElementById('game-end')
const resetBtn = document.getElementById('reset-btn')

// game variables
let gameActive;
let gameRestart = false;
let currentScore = 0;
let givenTime;

// functions

function initGame() {
    if (gameRestart) { resetBtn.removeEventListener('click', gameRestartEvent); };
    gameActive = false;
    currentScore = 0;
    givenTime = 30;
    scoreboard.textContent = String(currentScore);
    timer.textContent = String(givenTime);
    gameStartSection.style = 'display: flex;';
    gameEndSection.style = 'display: none;';
    clickBtn.addEventListener('click', gameStartEvent)
}

function startGame () {
    if (!gameActive) {
        gameActive = true;
        startTimer();
    }
}

function updateScore () {
    currentScore++;
    scoreboard.textContent = String(currentScore);
}

async function startTimer () {
    if (gameActive) {
        let timeleft = String(givenTime);

        while (timeleft > 0) {
            timer.textContent = String(timeleft);

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
    gameRestart = true;
    clickBtn.removeEventListener('click', gameStartEvent);
    resetBtn.addEventListener('click', gameRestartEvent);
}

// event listener variables

const gameStartEvent = () => {
    startGame();
    updateScore();
};

const gameRestartEvent = () => {initGame();};

// on load

initGame();