let playerController = (function() {
    let PLAYER1INPUT;
    let PLAYER2INPUT;

    let players;
    let currentPlayer;

    function queryDomElements() {
        PLAYER1INPUT = document.querySelector('input[name="player1-name"]');
        PLAYER2INPUT = document.querySelector('input[name="player2-name"]');
    }

    function init() {
        queryDomElements();
    }

    function resetPlayerBoxes() {
        PLAYER1INPUT.value = '';
        PLAYER2INPUT.value = '';
    }

    /**
     * Changes HTML to remove player inputs, display only the names.
     */
    function makePlayerBoxesGameStart() {

    }

    /**
     * If no currentPlayer exists. Take first player
     * If exists, take other than currentPlayer.
     * Makes currentPlayer player box active.
     */
    function switchPlayer() {

    }

    /**
     * Will create two players. First player will be assigned symbol 'X', second one 'O'.
     * Will put the players into the players array.
     */
    function createPlayers() {


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
        createPlayers,
        currentPlayer
    }

})();

let gameBoard = (function() {
    let BOARDELEMENTS;
    const UNASSIGNED = 0;
    const X = 1;
    const O = 2;
    const TIE = 3;

    let boardContent;

    function queryDomElements() {
        BOARDELEMENTS = [
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
        for (let i = 0; i < BOARDELEMENTS.length; i++) {
            BOARDELEMENTS[i].addEventListener('click', () => gameController.handleSquareMarked(i));
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
                    BOARDELEMENTS[i].textContent = '';
                    break;
                case X:
                    BOARDELEMENTS[i].textContent = 'X';
                    break;
                case O:
                    BOARDELEMENTS[i].textContent = 'O';
                    break;
            }
        }
    }

    /** 
     * Will put corresponding symbol to the boardContent position
     */
    function markSquare(coordinate) {
        drawBoard();
    }

    /**
     * Check boardContent and determine, if anyone has won the game,
     * or is it a tie. Returns X, Y, TIE or null.
     */
    function determineCurrentOutcome() {

    }

    init();

    return {
        markSquare,
        determineCurrentOutcome,
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

    /**
     * Disable gameBoard HTML. Display an outcome on the screen.
     */
    function finishGame(outcome) {

    }

    function resetGame() {
        gameBoard.cleanBoard();
        playerController.resetPlayers();
    }

    function newTurn() {
        let currentOutcome = gameBoard.determineCurrentOutcome();
        if (currentOutcome) {
            finishGame(outcome);
        }
        playerController.switchPlayer();
    }

    function start() {
        resetGame();
        playerController.createPlayers();
        newTurn();
    }

    /**
     * Check, if the square is already marked. If not, then mark the square according to current player's symbol.
     * Then call a newTurn().
     */
    function handleSquareMarked(coordinate) {
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