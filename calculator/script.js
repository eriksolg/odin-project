const ADD = 0;
const SUBTRACT = 1;
const MULTIPLY = 2;
const DIVIDE = 4;
const calculatorText = document.querySelector('#calculator-text');
const maxCalculationSize = 14;

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

function evaluateAcceptableInput(input) {
    let currentCalcHasOperator = currentCalculation.reduce(((hasOperator, value) => hasOperator || isOperator(value)), false);

    if ((currentCalculation.length == 0) && isOperator(input)) {
        return false;
    }
    if ((isOperator(currentCalculation[currentCalculation.length - 1])) && isOperator(input)) {
        return false;
    }
    if ((maxCalculationSize - currentCalculation.length == 1) && isOperator(input)) {
        return false;
    }
    if ((maxCalculationSize - currentCalculation.length == 2) && !isOperator(input)) {
        return false;
    }
    if (maxCalculationSize - currentCalculation.length == 0) {
        return false;
    }
    if (currentCalcHasOperator && isOperator(input)) {
        return false;
    }
    if ((currentCalculation.length == 0) && input == 0) {
        return false;
    }

    return true;
}

function isOperator(input) {
    return typeof(input) == 'string';
}

function updateCurrentCalculation(input) {
    if (evaluateAcceptableInput(input)) {
        currentCalculation.push(input);
        updateCalculatorText();
    }

}

function clearCurrentCalculation() {
    currentCalculation = [];
    updateCalculatorText();
}

function parseCurrentCalculation() {

}

function updateCalculatorText() {
    let calculationString = currentCalculation.join('');
    calculatorText.textContent = calculationString;
}

function operationButtonPressed(event) {
    switch (event.target.id) {
        case 'number-1':
            updateCurrentCalculation(1);
            break;
        case 'number-2':
            updateCurrentCalculation(2);
            break;
        case 'number-3':
            updateCurrentCalculation(3);
            break;
        case 'number-4':
            updateCurrentCalculation(4);
            break;
        case 'number-5':
            updateCurrentCalculation(5);
            break;
        case 'number-6':
            updateCurrentCalculation(6);
            break;
        case 'number-7':
            updateCurrentCalculation(7);
            break;
        case 'number-8':
            updateCurrentCalculation(8);
            break;
        case 'number-9':
            updateCurrentCalculation(9);
            break;
        case 'number-0':
            updateCurrentCalculation(0);
            break;
        case 'add':
            updateCurrentCalculation('+');
            break;
        case 'subtract':
            updateCurrentCalculation('-');
            break;
        case 'multiply':
            updateCurrentCalculation('*');
            break;
        case 'divide':
            updateCurrentCalculation('/');
            break;
    }
}

let currentCalculation = [];
let operationButtons = document.querySelectorAll('.operation');

for (let i = 0; i < operationButtons.length; i++) {
    operationButtons[i].addEventListener('click', operationButtonPressed);
}