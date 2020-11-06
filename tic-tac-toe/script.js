let playerController = (function() {
    let player1Input;
    let player2Input;
    let player1Label;
    let player2Label;
    let player1Header;
    let player2Header;
    let playerBox;

    let players;
    let currentPlayer;

    function queryDomElements() {
        player1Input = document.querySelector('input[name="player1-name"]');
        player2Input = document.querySelector('input[name="player2-name"]');
        playerBox = document.querySelector('#player-box');
        player1Label = document.querySelector('#player1-label');
        player2Label = document.querySelector('#player2-label');
        player1Header = document.querySelector('#player1-header');
        player2Header = document.querySelector('#player2-header');
    }

    function init() {
        queryDomElements();
    }

    function resetPlayerInputs() {
        player1Input.style.display = 'inline-block';
        player2Input.style.display = 'inline-block';
        player1Label.style.display = 'inline';
        player2Label.style.display = 'inline';
        player1Header.style.display = 'none';
        player2Header.style.display = 'none';
        player1Input.value = '';
        player2Input.value = '';
    }

    function makePlayerBoxesGameStart() {
        player1Header.textContent = players[0].name;
        player2Header.textContent = players[1].name;

        player1Input.style.display = 'none';
        player2Input.style.display = 'none';
        player1Label.style.display = 'none';
        player2Label.style.display = 'none';
        player1Header.style.display = 'inline-block';
        player2Header.style.display = 'inline-block';
    }

    function playerHeadersHighlightCurrent() {
        switch (currentPlayer) {
            case 0:
                player1Header.classList.add('current-player-header');
                player2Header.classList.remove('current-player-header');
                break;
            case 1:
                player1Header.classList.remove('current-player-header');
                player2Header.classList.add('current-player-header');
                break;
        }
    }

    function getCurrentPlayerSymbol() {
        return players[currentPlayer].symbol;
    }

    function switchPlayer() {
        switch (currentPlayer) {
            case null:
            case 1:
                currentPlayer = 0;
                break;
            case 0:
                currentPlayer = 1;
                break;
        }
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
        resetPlayers,
        getCurrentPlayerSymbol,
        createPlayers
    }
})();

let gameBoard = (function() {
    let boardElements;
    const UNASSIGNED = 0;
    const X = 1;
    const O = 2;
    const TIE = 3;

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
            boardElements[i].addEventListener('click', () => gameController.handleSquareMarked(i));
        }
    }

    function init() {
        queryDomElements();
        addListeners();
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
        boardContent[coordinate] = playerController.getCurrentPlayerSymbol();
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
        markSquare,
        checkIfSquareMarked,
        determineCurrentOutcome,
        X,
        O,
        cleanBoard
    }
})();

let gameController = (function() {
    let newGameButton;
    let resetGameButton;

    function queryDomElements() {
        newGameButton = document.querySelector('#new-game');
        resetGameButton = document.querySelector('#reset-game');
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
        switch (outcome) {
            case gameBoard.X:
                alert('player1wins');
                break;
            case gameBoard.O:
                alert('player2wins');
                break;
            case gameBoard.TIE:
                alert('tie');
                break;
        }
    }

    function resetGame() {
        gameBoard.cleanBoard();
        playerController.resetPlayers();
        replaceResetGameButton();
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
        }
        playerController.switchPlayer();
    }

    function start() {
        if (!playerController.createPlayers()) {
            return;
        }

        replaceNewGameButton();
        newTurn();
    }

    function handleSquareMarked(coordinate) {
        if (gameBoard.checkIfSquareMarked(coordinate)) {
            return;
        }
        gameBoard.markSquare(coordinate)
        newTurn();
    }

    init();

    return {
        handleSquareMarked
    }
})();


let playerFactory = (name, symbol) => {
    return { name, symbol };
}