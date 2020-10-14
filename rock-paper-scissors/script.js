const gestures = ["rock", "paper", "scissors"];
const COMPUTER_WIN = 0;
const PLAYER_WIN = 1;
const TIE = 2;

const rockButton = document.querySelector('#rock');
const paperButton = document.querySelector('#paper');
const scissorsButton = document.querySelector('#scissors');
const resetButton = document.querySelector('#reset');

const playerScoreText = document.querySelector('#player-score');
const computerScoreText = document.querySelector('#computer-score');
const roundText = document.querySelector('#round');
const dialogText = document.querySelector('#dialog-text');
const titleText = document.querySelector('#title');

rockButton.onclick = () => playRound("rock", computerPlay());
paperButton.onclick = () => playRound("paper", computerPlay());
scissorsButton.onclick = () => playRound("scissors", computerPlay());
resetButton.onclick = () => resetGame();

function computerPlay() {
    return gestures[Math.floor(Math.random() * gestures.length)];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection == "paper" && computerSelection == "rock" ||
        playerSelection == "rock" && computerSelection == "scissors" ||
        playerSelection == "scissors" && computerSelection == "paper") {
        round++;
        playerScore++;
        dialogText.innerHTML = `You won the round! You picked ${playerSelection}. Computer picked ${computerSelection}`;
        refreshScoresTexts();
        checkGameState();

    } else if (playerSelection == computerSelection) {
        round++;
        dialogText.innerHTML = `Tie! You both picked ${playerSelection}.`;
        refreshScoresTexts();
        checkGameState()
    } else {
        round++;
        computerScore++;
        dialogText.innerHTML = `You lost the round! You picked ${playerSelection}. Computer picked ${computerSelection}`;
        refreshScoresTexts();
        checkGameState();
    }
}

function refreshScoresTexts() {
    playerScoreText.innerHTML = playerScore;
    computerScoreText.innerHTML = computerScore;
    roundText.innerHTML = round;
    titleText.innerHTML = "Rock, Paper, Scissors."
}

function checkGameState() {
    if (playerScore != 5 && computerScore != 5) {
        return;
    }
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
    rockButton.classList.add("button-disabled");
    paperButton.classList.add("button-disabled");
    scissorsButton.classList.add("button-disabled");

    if (computerScore == 5) {
        titleText.innerHTML = "Game Over! Computer won the game!"
    } else {
        titleText.innerHTML = "Congratulations! You won the game!"
    }
}

function resetGame() {
    round = 1;
    playerScore = 0;
    computerScore = 0;
    refreshScoresTexts();
    dialogText.innerHTML = "";
    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorsButton.disabled = false;
    rockButton.classList.remove("button-disabled");
    paperButton.classList.remove("button-disabled");
    scissorsButton.classList.remove("button-disabled");
}

let round = 1;
let playerScore = 0;
let computerScore = 0;

refreshScoresTexts();