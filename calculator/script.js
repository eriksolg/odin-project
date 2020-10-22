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
document.querySelector('#action-backspace').addEventListener('click', () => performBackspace());
document.querySelector('#number-dot').addEventListener('click', () => handleNumberInput('.'));

document.addEventListener("keydown", event => {
    switch (event.keyCode) {
        case 48:
            handleNumberInput(0)
            break;
        case 49:
            handleNumberInput(1)
            break;
        case 50:
            handleNumberInput(2)
            break;
        case 51:
            handleNumberInput(3)
            break;
        case 52:
            handleNumberInput(4)
            break;
        case 53:
            handleNumberInput(5)
            break;
        case 54:
            handleNumberInput(6)
            break;
        case 55:
            handleNumberInput(7)
            break;
        case 56:
            handleNumberInput(8)
            break;
        case 57:
            handleNumberInput(9)
            break;
        case 190:
            handleNumberInput('.');
            break;
        case 187:
            setCurrentOperator(ADD);
            break;
        case 189:
            setCurrentOperator(SUBTRACT);
            break;
        case 191:
            setCurrentOperator(MULTIPLY);
            break;
        case 55:
            setCurrentOperator(DIVIDE);
            break;
        case 8:
            performBackspace();
            break;
        case 13:
            handleFinalResult();
            break;


    }
});

let lastOperator;
let lastResult;
let currentNumber;
let currentOperator;


function resetState() {
    currentNumber = '';
    lastResult = null;
    lastOperator = null;
    resetCurrentOperator();
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

function performBackspace() {
    currentNumber = currentNumber.slice(0, -1);
    setCalculatorText(currentNumber);
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
    if (currentNumber == '0' && number != '.') {
        return;
    }
    if (currentNumber == '' && number == '.') {
        return;
    }
    if (currentNumber.includes('.') && number == '.') {
        return;
    }
    if (currentOperator && number != '.') {

        if (!lastResult) {
            lastResult = 0;
            lastOperator = ADD;
        }
        newResult = operate(lastOperator, +lastResult, +currentNumber);
        lastResult = newResult;
        lastOperator = currentOperator;
        resetCurrentOperator();
        currentNumber = '' + number;
        setCalculatorText(currentNumber);
    } else if (MAXCALCULATIONSIZE - currentNumber.length) {
        if ((MAXCALCULATIONSIZE - currentNumber.length) == 1 && number == '.') {
            return;
        }
        currentNumber += number;
        setCalculatorText(currentNumber);
    }
}

function handleFinalResult() {
    if (currentOperator || !lastOperator) {
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