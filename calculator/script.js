const ADD = 0;
const SUBTRACT = 1;
const MULTIPLY = 2;
const DIVIDE = 4;
const calculatorText = document.querySelector('#calculator-text');
const maxInputCount = 15;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case ADD:
            add(a, b);
            break;
        case SUBTRACT:
            subtract(a, b);
            break;
        case MULTIPLY:
            multiply(a, b);
            break;
        case DIVIDE:
            divide(a, b);
            break;
    }
}

function evaluateAcceptableInput() {

}

function updateCurrentCalculation(input) {

}

function clearCurrentCalculation() {

}

function parseCurrentCalculation() {

}

let currentCalculation = [];