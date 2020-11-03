let gameController = (function() {
    let players = [];
    let currentPlayer = null;

    function determineCurrentOutcome() {

    }

    function switchPlayer(player) {

    }

    function finishGame(outcome) {

    }

    function resetGame() {
        gameBoard.cleanBoard();
    }

    function createPlayers() {

    }

    function newTurn() {
        let currentOutcome = determineCurrentOutcome();
        if (outcome) {
            finishGame(outcome);
        }
        switchPlayer();
    }

    function newGame() {
        resetGame();
        createPlayers();
        newTurn();
    }

    function handleSquareMarked(event) {
        gameBoard.markSquare(currentPlayer, coordinate, content)
        newTurn();
    }

    newGame();

})();

let gameBoard = (function() {
    let boardContent = [];

    function cleanBoard() {

    }

    function drawBoard() {

    }

    function markSquare(player, coordinate, content) {
        drawBoard();
    }

    return {
        markSquare,
        cleanBoard
    }

});


let playerFactory = (name, isComputer, color) => {

    return { name, isComputer, color };
}

let squareFactory = (player, content) => {
    return { player, content };
}