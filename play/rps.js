// game state variables
let playerChoice;
let computerChoice;

// DOM variables
const choiceRock = document.getElementById('rock');
const choicePaper = document.getElementById('paper');
const choiceScissors = document.getElementById('scissors');
const restartBtn = document.getElementById('restart-btn')
const resultMsg = document.getElementById('result-message')
const gameStartSection = document.getElementById('game-start')
const gameEndSection = document.getElementById('game-end')

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
    const cpuChoice = generateComputerChoice()
    let resultMessage = processChoice(chosen.id, cpuChoice)
    resultMessage !== 'Draw' ? resultMessage = 'You ' + resultMessage : 'Draw';
    resultMsg.innerHTML = resultMessage;
    // console.log('CPU chose', cpuChoice)
    // console.log(resultMessage)
    gameStartSection.style = 'display: none;'
    gameEndSection.style = 'display: flex;'
}

function restartGame() {
    // console.log('game restart')
    resultMsg.innerHTML = '';
    gameStartSection.style = 'display: block;'
    gameEndSection.style = 'display: none;'
}

// Event listeners
choiceRock.addEventListener('click', () => { playGame(choiceRock); });
choicePaper.addEventListener('click', () => { playGame(choicePaper); });
choiceScissors.addEventListener('click', () => { playGame(choiceScissors); });

restartBtn.addEventListener('click', () => { restartGame(); });