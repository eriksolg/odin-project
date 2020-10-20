const ADD = 1;
const SUBTRACT = 2;
const MULTIPLY = 3;
const DIVIDE = 4;
const maxCalculationSize = 14;

const calculatorText = document.querySelector('#calculator-text');


const numbers = [
    document.querySelector('#number-0'),
    document.querySelector('#number-1'),
    document.querySelector('#number-2'),
    document.querySelector('#number-3'),
    document.querySelector('#number-4'),
    document.querySelector('#number-5'),
    document.querySelector('#number-6'),
    document.querySelector('#number-7'),
    document.querySelector('#number-8'),
    document.querySelector('#number-9')
]

const operators = new Map([
    [ADD, document.querySelector('#operator-add')],
    [SUBTRACT, document.querySelector('#operator-subtract')],
    [MULTIPLY, document.querySelector('#operator-multiply')],
    [DIVIDE, document.querySelector('#operator-divide')]
]);

for (let [operator, element] of operators) {
    element.addEventListener('click', () => setCurrentOperator(operator));
}
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', () => handleNumberInput(i));
}
document.querySelector('#action-equals').addEventListener('click', () => handleFinalResult());
document.querySelector('#action-clear').addEventListener('click', () => resetState(true));

let lastOperator;
let lastResult;
let currentNumber;
let currentOperator;

function resetState(resetScreen) {
    currentNumber = '';
    lastResult = 0;
    lastOperator = ADD;
    resetCurrentOperator();
    resetScreen ? calculatorText.textContent = 0 : null;
}

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

function resetCurrentOperator() {
    if (currentOperator) {
        operators.get(currentOperator).classList.remove('active');
    }
    currentOperator = null;
}

function setCurrentOperator(operator) {
    if (currentOperator == operator) {
        resetCurrentOperator();
        return
    }
    if (currentOperator) {
        resetCurrentOperator();
    }
    operators.get(operator).classList.add('active');
    currentOperator = operator;
}

function updateCalculatorText() {
    calculatorText.textContent = currentNumber;
}

function handleNumberInput(number) {
    if (currentOperator) {
        newResult = operate(lastOperator, +lastResult, +currentNumber);
        lastResult = newResult;
        lastOperator = currentOperator;
        resetCurrentOperator();
        currentNumber = '';
        currentNumber += number;
        updateCalculatorText();
    } else if (maxCalculationSize - currentNumber.length) {
        currentNumber += number;
        updateCalculatorText();
    }
}

function handleFinalResult() {
    if (currentOperator) {
        return;
    }
    result = operate(lastOperator, +lastResult, +currentNumber);
    calculatorText.textContent = result
    resetState(false);
}

resetState(true);