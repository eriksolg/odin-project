let playerController = (function() {
    let player1Input;
    let player2Input;
    let player1Box;
    let player2Box;

    let players;
    let currentPlayer;

    function queryDomElements() {
        player1Input = document.querySelector('input[name="player1-name"]');
        player2Input = document.querySelector('input[name="player2-name"]');
        player1Box = document.querySelector('#player1-box');
        player2Box = document.querySelector('#player2-box');
    }

    function init() {
        queryDomElements();
    }

    function resetPlayerBoxes() {
        player1Input.value = '';
        player2Input.value = '';
    }

    function makePlayerBoxesGameStart() {
        let player1Header = document.createElement('h2');
        let player2Header = document.createElement('h2');

        player1Header.classList.add('player-header');
        player2Header.classList.add('player-header');

        player1Header.textContent = players[0].name;
        player2Header.textContent = players[1].name;

        player1Input.style.display = 'none';
        player2Input.style.display = 'none';

        player1Box.appendChild(player1Header);
        player2Box.appendChild(player2Header);
    }

    function playerBoxesHighlightCurrent() {
        switch (currentPlayer) {
            case 0:
                player1Box.classList.add('current-player-box');
                player2Box.classList.remove('current-player-box');
                break;
            case 1:
                player1Box.classList.remove('current-player-box');
                player2Box.classList.add('current-player-box');
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
        playerBoxesHighlightCurrent();
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
        resetPlayerBoxes();
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

    function queryDomElements() {
        newGameButton = document.querySelector('#new-game');
    }

    function addListeners() {
        newGameButton.addEventListener('click', start);
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