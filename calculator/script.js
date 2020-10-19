const calculatorText = document.querySelector('#calculator-text');
const operationButtons = document.querySelectorAll('.operation');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
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
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function evaluateAcceptableInput(input) {
    if (currentCalcHasOperator() && isOperator(input)) {
        return false;
    }

    if (currentCalculation.length == 0 && isOperator(input)) {
        return false;
    }

    if (maxCalculationSize - currentCalculation.length == 0) {
        return false;
    }

    if (!currentCalcHasOperator() && (maxCalculationSize - currentCalculation.length == 2) && !isOperator(input)) {
        return false;
    }

    return true;
}

function isOperator(input) {
    return input == '+' ||
        input == '-' ||
        input == '*' ||
        input == '/';
}

function currentCalcHasOperator() {
    return currentCalculation.reduce(((hasOperator, value) => hasOperator || isOperator(value)), false);
}

function updateCurrentCalculation(input) {
    if (evaluateAcceptableInput(input)) {
        currentCalculation.push(input);
        updateCalculatorText();
    }
}

function clearCurrentCalculation() {
    currentCalculation = [];
    calculatorText.textContent = 0;
}

function parseCurrentCalculation() {
    if (!currentCalcHasOperator()) {
        return;
    }
    let operatorIndex = currentCalculation.findIndex(element => isOperator(element));
    let operator = currentCalculation[operatorIndex];
    let operand1 = +currentCalculation.slice(0, operatorIndex).join('');
    let operand2 = +currentCalculation.slice(operatorIndex + 1).join('');
    let result = operate(operator, operand1, operand2);
    calculatorText.textContent = result;
    currentCalculation = [];
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

for (let i = 0; i < operationButtons.length; i++) {
    operationButtons[i].addEventListener('click', operationButtonPressed);
}

equals.addEventListener('click', parseCurrentCalculation);
clear.addEventListener('click', clearCurrentCalculation);

clearCurrentCalculation();