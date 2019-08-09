let operands = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
let operators = ['+', '-', '*', '/', '='];

let firstOperand = '';
let firstOperandFlag = true;
let secondOperand = '';
let secondOperandFlag = false;
let operator = '';
let output = '';
let result = false;


window.onload = function() {
    let buttons = document.getElementsByTagName("button");
    let display = document.getElementById('display');
    let clear = document.getElementById('clear');

    for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].addEventListener('click', calc);
    }

    clear.onclick = function() {
        firstOperand = '';
        firstOperandFlag = true;
        secondOperand = '';
        secondOperandFlag = false;
        operator = '';
        display.value = '';
        result = false;
    }
};

function calc(ev) {
    let currentButton = ev.target.value;
    if (operands.includes(currentButton)) {
        if (firstOperandFlag) {
            firstOperand = result !== false ? currentButton : firstOperand + currentButton;
            firstOperand = firstOperand === '.' ? '0.' : firstOperand;
            result = false;
        } else if (secondOperandFlag) {
            secondOperand += currentButton;
            secondOperand = secondOperand === '.' ? '0.' : secondOperand;
            result = false;
        }
    } else if (operators.includes(currentButton)) {
        if (operator === '' && currentButton !== '=') {
            operator = currentButton;
            firstOperandFlag = false;
            secondOperandFlag = true;
            result = false;
        } else if (secondOperand === '' && currentButton !== '=') {
            operator = currentButton;
            result = false;
        } else {
            firstOperand = firstOperand === '' ? 0 : firstOperand;
            if (secondOperand === '' && operator !== '') {
                secondOperand = firstOperand;
            }
            firstOperand = eval(firstOperand + operator + secondOperand);
            result = firstOperand;
            secondOperand = '';
            if (currentButton === '=') {
                operator = '';
                firstOperandFlag = true;
            } else {
                operator = currentButton;
                secondOperandFlag = true;
                result = false;
            }
        }
    }
    output = result ? result + "  " : firstOperand + " " + operator + " " + secondOperand;
    display.value = output;

    if (firstOperand === Infinity || isNaN(firstOperand)) {
        firstOperand = '';
        firstOperandFlag = true;
        secondOperand = '';
        secondOperandFlag = false;
        operator = '';
        result = false;
    }
}