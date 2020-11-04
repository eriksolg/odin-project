let gameController = (function() {

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
        let currentOutcome = determineCurrentOutcome();
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
    function handleSquareMarked(event) {
        gameBoard.markSquare(coordinate)
        newTurn();
    }

    resetGame();

})();

let playerController = (function() {
    let players;
    let currentPlayer;

    /**
     * Resets HTML of player inputs
     */
    function resetPlayerBoxes() {

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
    }

    return {
        switchPlayer,
        currentPlayer
    }
})

let gameBoard = (function() {
    let boardContent;
    const UNASSIGNED = 0;
    const X = 1;
    const Y = 2;
    const TIE = 3;

    function cleanBoard() {
        boardContent = [
            UNASSIGNED, UNASSIGNED, UNASSIGNED,
            UNASSIGNED, UNASSIGNED, UNASSIGNED,
            UNASSIGNED, UNASSIGNED, UNASSIGNED
        ]
        drawBoard();
    }

    /** 
     * Will take the current boardContent and make changes in HTML
     */
    function drawBoard() {

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

    return {
        markSquare,
        cleanBoard
    }

});


let playerFactory = (name, symbol) => {

    return { name, symbol };
}