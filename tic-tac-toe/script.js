let playerController = (function() {
    let player1Input;
    let player2Input;
    let player1Label;
    let player2Label;
    let player1Header;
    let player2Header;
    let players;
    let currentPlayer;

    function queryDomElements() {
        player1Input = document.querySelector('input[name="player1-name"]');
        player2Input = document.querySelector('input[name="player2-name"]');
        player1Label = document.querySelector('#player1-label');
        player2Label = document.querySelector('#player2-label');
        player1Header = document.querySelector('#player1-header');
        player2Header = document.querySelector('#player2-header');
    }

    function addListeners() {
        [player1Input, player2Input].forEach(function(element) {
            element.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    gameController.newGameButton.click();
                }
            });
        });
    }

    function init() {
        queryDomElements();
        addListeners();
    }

    function resetPlayerInputs() {
        [player1Input, player2Input].forEach(function(element) {
            element.style.display = 'inline-block';
            element.value = '';
        });
        [player1Label, player2Label].forEach((element) => element.style.display = 'inline');
        [player1Header, player2Header].forEach((element) => element.style.display = 'none');
    }

    function makePlayerBoxesGameStart() {
        player1Header.textContent = players[0].name;
        player2Header.textContent = players[1].name;

        [player1Input, player2Input, player1Label, player2Label].forEach((element) => element.style.display = 'none');
        [player1Header, player2Header].forEach((element) => element.style.display = 'inline-block');
        player1Header.classList.add('current-player-header');
    }

    function playerHeadersHighlightCurrent() {
        [player1Header, player2Header].forEach((element) => element.classList.toggle('current-player-header'));
    }

    function getCurrentPlayer() {
        return players[currentPlayer];
    }

    function switchPlayer() {
        currentPlayer = 1 - currentPlayer
        playerHeadersHighlightCurrent();
    }

    function createPlayers() {
        let player1InputValue = player1Input.value;
        let player2InputValue = player2Input.value;

        if (player1InputValue == '' ||
            player2InputValue == '') {
            return false;
        }

        const player1 = playerFactory(player1InputValue, gameBoard.X);
        const player2 = playerFactory(player2InputValue, gameBoard.O);

        players = [];
        players.push(player1, player2);

        makePlayerBoxesGameStart();

        currentPlayer = 0;

        return true;
    }

    function resetPlayers() {
        players = [];
        currentPlayer = null;
        resetPlayerInputs();
    }

    init();

    return {
        switchPlayer,
        playerHeadersHighlightCurrent,
        resetPlayers,
        getCurrentPlayer,
        createPlayers
    }
})();

let gameBoard = (function() {
    const UNASSIGNED = 0;
    const X = 1;
    const O = 2;
    const TIE = 3;
    let boardElements;

    let boardContent;

    function queryDomElements() {
        boardElements = [
            document.querySelector('[data-coordinate="0"]'),
            document.querySelector('[data-coordinate="1"]'),
            document.querySelector('[data-coordinate="2"]'),
            document.querySelector('[data-coordinate="3"]'),
            document.querySelector('[data-coordinate="4"]'),
            document.querySelector('[data-coordinate="5"]'),
            document.querySelector('[data-coordinate="6"]'),
            document.querySelector('[data-coordinate="7"]'),
            document.querySelector('[data-coordinate="8"]'),
        ]
    }

    function addListeners() {
        for (let i = 0; i < boardElements.length; i++) {
            boardElements[i].addEventListener('click', function() {
                if (checkIfSquareMarked(i)) {
                    return;
                }
                if (gameController.checkIfGameFinished()) {
                    return
                }
                markSquare(i);
                gameController.newTurn();
            });
        }
    }

    function init() {
        queryDomElements();
    }

    function cleanBoard() {
        boardContent = [
            UNASSIGNED, UNASSIGNED, UNASSIGNED,
            UNASSIGNED, UNASSIGNED, UNASSIGNED,
            UNASSIGNED, UNASSIGNED, UNASSIGNED
        ]
        drawBoard();
    }

    function drawBoard() {
        for (let i = 0; i < boardContent.length; i++) {
            switch (boardContent[i]) {
                case UNASSIGNED:
                    boardElements[i].textContent = '';
                    break;
                case X:
                    boardElements[i].textContent = 'X';
                    break;
                case O:
                    boardElements[i].textContent = 'O';
                    break;
            }
        }
    }

    function markSquare(coordinate) {
        boardContent[coordinate] = playerController.getCurrentPlayer().symbol;
        drawBoard();
    }

    function checkIfSquareMarked(coordinate) {
        return boardContent[coordinate] != UNASSIGNED;
    }

    function determineCurrentOutcome() {
        switch (true) {
            case
            boardContent[0] == boardContent[1] &&
            boardContent[0] == boardContent[2] &&
            boardContent[0] != UNASSIGNED:
                return boardContent[0];
            case
            boardContent[0] == boardContent[3] &&
            boardContent[0] == boardContent[6] &&
            boardContent[0] != UNASSIGNED:
                return boardContent[0];
            case
            boardContent[0] == boardContent[4] &&
            boardContent[0] == boardContent[8] &&
            boardContent[0] != UNASSIGNED:
                return boardContent[0];
            case
            boardContent[1] == boardContent[4] &&
            boardContent[1] == boardContent[7] &&
            boardContent[1] != UNASSIGNED:
                return boardContent[1];
            case
            boardContent[2] == boardContent[5] &&
            boardContent[2] == boardContent[8] &&
            boardContent[2] != UNASSIGNED:
                return boardContent[2];
            case
            boardContent[2] == boardContent[4] &&
            boardContent[2] == boardContent[6] &&
            boardContent[2] != UNASSIGNED:
                return boardContent[2];
            case
            boardContent[3] == boardContent[4] &&
            boardContent[3] == boardContent[5] &&
            boardContent[3] != UNASSIGNED:
                return boardContent[3];
            case
            boardContent[6] == boardContent[7] &&
            boardContent[6] == boardContent[8] &&
            boardContent[6] != UNASSIGNED:
                return boardContent[6];
            case !boardContent.includes(UNASSIGNED):
                return TIE;
            default:
                return null;
        }
    }

    init();

    return {
        determineCurrentOutcome,
        addListeners,
        X,
        O,
        cleanBoard
    }
})();

let gameController = (function() {
    let newGameButton;
    let resetGameButton;
    let gameOverText;
    let gameFinished;

    function queryDomElements() {
        newGameButton = document.querySelector('#new-game');
        resetGameButton = document.querySelector('#reset-game');
        gameOverText = document.querySelector('#game-over');
    }

    function addListeners() {
        newGameButton.addEventListener('click', start);
        resetGameButton.addEventListener('click', resetGame);
    }

    function init() {
        queryDomElements();
        addListeners();
        resetGame();
    }

    function finishGame(outcome) {
        gameFinished = true;
        setGameOverText(outcome);
    }

    function setGameOverText(outcome) {
        switch (outcome) {
            case gameBoard.TIE:
                gameOverText.innerHTML = 'It is a tie!';
                break;
            default:
                gameOverText.innerHTML = `${playerController.getCurrentPlayer().name} won!`;
        }
    }

    function clearGameOverText() {
        gameOverText.innerHTML = ' ';
    }

    function resetGame() {
        gameBoard.cleanBoard();
        playerController.resetPlayers();
        replaceResetGameButton();
        clearGameOverText();
    }

    function replaceNewGameButton() {
        newGameButton.style.display = 'none';
        resetGameButton.style.display = 'block';
    }

    function replaceResetGameButton() {
        newGameButton.style.display = 'block';
        resetGameButton.style.display = 'none';
    }

    function newTurn() {
        let currentOutcome = gameBoard.determineCurrentOutcome();
        if (currentOutcome) {
            finishGame(currentOutcome);
            return;
        }
        playerController.switchPlayer();
    }

    function start() {
        gameFinished = false;
        addListeners();
        gameBoard.addListeners();
        if (!playerController.createPlayers()) {
            return;
        }

        replaceNewGameButton();
    }

    function checkIfGameFinished() {
        return gameFinished;
    }

    init();

    return {
        checkIfGameFinished,
        newTurn,
        newGameButton
    }
})();


let playerFactory = (name, symbol) => {
    return { name, symbol };
}