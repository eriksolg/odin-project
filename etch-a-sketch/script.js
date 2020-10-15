const gridContainer = document.querySelector('#grid-container');
const resetButton = document.querySelector('#reset-button');
const gridSizeInPixels = 480;
const defaultGridSize = 16;
const maxGridSize = 100;


function createGrid(gridSize) {

    gridContainer.innerHTML = '';
    gridContainer.style.width = 480 + 'px';
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${gridSizeInPixels / gridSize})`;

    for (i = 0; i < gridSize * gridSize; i++) {
        let squareDiv = document.createElement('div');
        squareDiv.classList.add('grid-square');
        squareDiv.style.width = (gridSizeInPixels / gridSize) + 'px';
        squareDiv.style.height = (gridSizeInPixels / gridSize) + 'px';
        squareDiv.style.backgroundColor = 'white';
        squareDiv.addEventListener('mouseover', colorSquareOnMouseOver);
        gridContainer.appendChild(squareDiv);
    }

    squareSize = gridSizeInPixels / gridSize;
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${squareSize}px)`;
}

function colorSquareOnMouseOver(event) {

    eventTarget = event.target;
    backgroundColor = window.getComputedStyle(eventTarget).getPropertyValue('background-color');

    if (backgroundColor == "rgb(255, 255, 255)") {
        eventTarget.style.backgroundColor = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
        eventTarget.setAttribute("passes", "0");
    } else {
        let passes = +eventTarget.getAttribute("passes");
        passes += 1;
        eventTarget.setAttribute("passes", passes);
        let colorCodes = backgroundColor.match(/\d+/g).map(Number);
        eventTarget.style.backgroundColor = `rgb(${getTenPercentDarker(colorCodes[0], passes)}, ${getTenPercentDarker(colorCodes[1], passes)}, ${getTenPercentDarker(colorCodes[2], passes)})`;
    }
}

function getTenPercentDarker(colorCode, passes) {
    return ((colorCode * 10) / (10 - passes + 1)) * ((10 - passes) / 10)
}

function randomNumber() {
    return Math.floor(Math.random() * 256);
}

resetButton.addEventListener('click', function(event) {
    let squares = document.getElementsByClassName('grid-square');

    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = "white";
    }

    let userInput = prompt('How many squares for the new grid?', defaultGridSize);
    while (isNaN(userInput) || userInput < 1 || userInput > maxGridSize) {
        userInput = prompt(`Please enter correct number between 0 and ${maxGridSize}! How many squares for the new grid?`);
    }

    userInput = Math.floor(userInput);
    createGrid(userInput);
});

createGrid(defaultGridSize);