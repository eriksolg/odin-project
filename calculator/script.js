const ADD = 1;
const SUBTRACT = 2;
const MULTIPLY = 3;
const DIVIDE = 4;
const MAXCALCULATIONSIZE = 14;
const CALCULATORTEXT = document.querySelector('#calculator-text');
const NUMBERS = [
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
const OPERATORS = new Map([
    [ADD, document.querySelector('#operator-add')],
    [SUBTRACT, document.querySelector('#operator-subtract')],
    [MULTIPLY, document.querySelector('#operator-multiply')],
    [DIVIDE, document.querySelector('#operator-divide')]
]);

for (let [operator, element] of OPERATORS) {
    element.addEventListener('click', () => setCurrentOperator(operator));
}
for (let i = 0; i < NUMBERS.length; i++) {
    NUMBERS[i].addEventListener('click', () => handleNumberInput(i));
}
document.querySelector('#action-equals').addEventListener('click', () => handleFinalResult());
document.querySelector('#action-clear').addEventListener('click', () => resetState());

let lastOperator;
let lastResult;
let currentNumber;
let currentOperator;


function resetState() {
    currentNumber = '';
    lastResult = 0;
    lastOperator = ADD;
    resetCurrentOperator();
    CALCULATORTEXT.textContent = 0;
}

function operate(operator, a, b) {
    switch (operator) {
        case ADD:
            return a + b;
        case SUBTRACT:
            return a - b;
        case MULTIPLY:
            return a * b;
        case DIVIDE:
            return a / b;
    }
}

function setCalculatorText(input) {
    CALCULATORTEXT.textContent = input;
}

function resetCurrentOperator() {
    if (currentOperator) {
        OPERATORS.get(currentOperator).classList.remove('active');
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
    OPERATORS.get(operator).classList.add('active');
    currentOperator = operator;
}

function handleNumberInput(number) {
    if (currentOperator) {
        newResult = operate(lastOperator, +lastResult, +currentNumber);
        lastResult = newResult;
        lastOperator = currentOperator;
        resetCurrentOperator();
        currentNumber = '';
        currentNumber += number;
        setCalculatorText(currentNumber);
    } else if (MAXCALCULATIONSIZE - currentNumber.length) {
        currentNumber += number;
        setCalculatorText(currentNumber);
    }
}

function handleFinalResult() {
    if (currentOperator) {
        return;
    }
    result = operate(lastOperator, +lastResult, +currentNumber);
    resetState();
    if (('' + result).length > MAXCALCULATIONSIZE) {
        result = result.toExponential(1);
    }
    setCalculatorText(result);
}

resetState();