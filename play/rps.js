// game state variables
let playerChoice;
let computerChoice;

// DOM variables
const choiceRock = document.getElementById('rock');
const choicePaper = document.getElementById('paper');
const choiceScissors = document.getElementById('scissors');
const restartBtn = document.getElementById('restart-btn')
const resultMsg = document.getElementById('result-message')
const oppChoice = document.getElementById('result-message-opp-choice')
const gameStartSection = document.getElementById('game-start')
const gameEndSection = document.getElementById('game-end')

// event listeners variables
const rockHandler = () => { playGame(choiceRock); };
const paperHandler = () => { playGame(choicePaper); };
const scissorsHandler = () => { playGame(choiceScissors); };
const restartHandler = () => { restartGame(); };

// functions
function processChoice (inputChoice, randomChoice) {
    let result;
    if (inputChoice === randomChoice) { 
        result = 'Draw'
        return result
    }
    switch (inputChoice) {
        case 'rock' :
            randomChoice === 'scissors' ? result = 'Win' : result = 'Lose';
            break;
        case 'paper' :
            randomChoice === 'rock' ? result = 'Win' : result = 'Lose';
            break;
        case 'scissors' :
            randomChoice === 'paper' ? result = 'Win' : result = 'Lose';
            break;
    }
    return result
}

function generateComputerChoice () {
    const randomNumber = Math.floor(Math.random() * 9 * 10);
    switch (randomNumber % 3) {
        case 0 : return 'rock';
        case 1 : return 'paper';
        case 2 : return 'scissors';
    }
}

function playGame(chosen) {
    const cpuChoice = generateComputerChoice();
    let resultMessage = processChoice(chosen.id, cpuChoice);
    resultMessage !== 'Draw' ? resultMessage = 'You ' + resultMessage : 'Draw';
    resultMsg.textContent = resultMessage;
    oppChoice.textContent = `Opponent chose ${cpuChoice}.`;
    gameStartSection.style = 'display: none;';
    gameEndSection.style = 'display: flex;';

    choiceRock.removeEventListener('click', rockHandler);
    choicePaper.removeEventListener('click', paperHandler);
    choiceScissors.removeEventListener('click', scissorsHandler);

    restartBtn.addEventListener('click', restartGame);
}

function restartGame() {
    resultMsg.textContent = '';
    oppChoice.textContent = '';
    gameStartSection.style = 'display: block;';
    gameEndSection.style = 'display: none;';
    initEventListener();
    restartBtn.removeEventListener('click', restartGame);
}

function initEventListener() {
    choiceRock.addEventListener('click', rockHandler);
    choicePaper.addEventListener('click', paperHandler);
    choiceScissors.addEventListener('click', scissorsHandler);
}

// on load

initEventListener();