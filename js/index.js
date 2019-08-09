var operands = ['1','2','3','4','5','6','7','8','9','0','.'];
var operators = ['+','-','*','/', '='];

var firstOperand = '';
var firstOperandFlag = true;
var secondOperand = '';
var secondOperandFlag = false;
var operator = '';
var output = '';
var result = false;


window.onload = function () {
  var buttons = document.getElementsByTagName("button");
  var display = document.getElementById('display');
  var clear = document.getElementById('clear');

  for (var i=0; i<buttons.length; i+=1) {
      buttons[i].addEventListener('click', calc);
  }

  clear.onclick = function () {
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
    var currentButton = ev.target.value;
    if (operands.includes(currentButton)){
        if (firstOperandFlag){
            firstOperand = result !== false ? currentButton : firstOperand + currentButton;
            firstOperand = firstOperand === '.' ? '0.' : firstOperand;
            result = false;
        } else if (secondOperandFlag){
            secondOperand += currentButton;
            secondOperand = secondOperand === '.' ? '0.' : secondOperand;
            result = false;
        }
    } else if (operators.includes(currentButton)) {
        if (operator === '' && currentButton !== '='){
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
            secondOperand ='';
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
    output = result ? result + "  " : firstOperand + " " +  operator + " " + secondOperand;
    display.value = output;

    if (firstOperand === Infinity || isNaN(firstOperand) ) {
        firstOperand = '';
        firstOperandFlag = true;
        secondOperand = '';
        secondOperandFlag = false;
        operator = '';
        result = false;
    }
}