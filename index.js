const currentDisp = document.querySelector('.current');
const prevDisp = document.querySelector('.prev');
const result = document.querySelector('.result');
const backspace = document.querySelector('.del');
const clear = document.querySelector('.clear')

let first = '';
let second = '';
let op = '';
let pendingOp = '';

function operate(a, operator, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b !== 0) {
                return a / b;
            } else {
                return 'Error';
            }
        case '%':
            return (a / 100) * b;
        default:
            return '';
    }
}

function updateDisplay() {
    currentDisp.innerHTML = second !== '' ? second : first;
}

function clearDisplay() {
    first = '';
    second = '';
    op = '';
    pendingOp = '';
    currentDisp.innerHTML = '';
    prevDisp.innerHTML = '';
}

function handleNumberClick(number) {
    if (op === '') {
        first += number;
    } else {
        second += number;
    }
    updateDisplay();
}

function handleOperatorClick(operator) {
    if (op !== '' && second !== '') {
        calculate();
        pendingOp = operator;
        prevDisp.innerHTML = first + ' ' + pendingOp;
    } else {
        op = operator;
        prevDisp.innerHTML = first + ' ' + op;
    }
    updateDisplay();
}

function calculate() {
    if (first !== '' && second !== '' && op !== '') {
        const resultValue = operate(first, op, second);
        first = resultValue.toString();
        second = '';
        op = pendingOp !== ''? pendingOp : '';
        updateDisplay();
        
    }
}

result.addEventListener('click', () => {
    calculate();
    prevDisp.innerHTML = '';
    if (pendingOp !== '') {
        op = pendingOp;
        pendingOp = '';
    }
});

const numbers = document.querySelectorAll('.num');
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        const numValue = number.innerHTML;
        handleNumberClick(numValue);
    });
});

const operators = document.querySelectorAll('.ope');
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        const operatorValue = operator.innerHTML;
        handleOperatorClick(operatorValue);
    });
});

clear.addEventListener('click', clearDisplay);

backspace.addEventListener('click', () => {
    if (second !== '') {
        second = second.slice(0, -1);
    } else if (op !== '') {
        op = '';
    } else if (first !== '') {
        first = first.slice(0, -1);
    }
    updateDisplay();
});