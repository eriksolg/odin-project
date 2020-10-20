const ADD = 1;
const SUBTRACT = 2;
const MULTIPLY = 3;
const DIVIDE = 4;

const calculatorText = document.querySelector('#calculator-text');

const numbers = [
    document.querySelector('#number-1'),
    document.querySelector('#number-2'),
    document.querySelector('#number-3'),
    document.querySelector('#number-4'),
    document.querySelector('#number-5'),
    document.querySelector('#number-6'),
    document.querySelector('#number-7'),
    document.querySelector('#number-8'),
    document.querySelector('#number-9'),
    document.querySelector('#number-0')
]

/** Operators */
const operators = [
    ADD => document.querySelector('#operator-add'),
    SUBTRACT => document.querySelector('#operator-subtract'),
    MULTIPLY => operatorMultiply = document.querySelector('#operator-multiply'),
    DIVIDE => document.querySelector('#operator-divide')
]

/** Actions */
const actionEquals = document.querySelector('#action-equals');
const actionClear = document.querySelector('#action-clear');

const maxCalculationSize = 14;

let lastOperator = ADD;
let lastResult = 0;
let currentNumber = '';
let currentOperator = null;

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
            return add(a, b);
        case SUBTRACT:
            return subtract(a, b);
        case MULTIPLY:
            return multiply(a, b);
        case DIVIDE:
            return divide(a, b);
    }
}

function toggleCurrentOperator() {

}

function handleNumberInput(number) {
    if (currentOperator) {
        newResult = operate(currentOperator, lastResult, currentNumber);
        lastResult = newResult;
        toggleCurrentOperator();

    } else if (maxCalculationSize - currentNumber.length) {
        currentNumber += number;
        calculatorText.textContent = currentNumber;
    }
}


for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', () => handleNumberInput(i + 1));
}