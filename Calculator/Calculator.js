const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  isWaitForSecondNumber: false,
};

function updateDisplay() {
  document.querySelector('#displayNumber').value = calculator.displayNumber;
}

function clearCalculator() {
  calculator.displayNumber = '0';
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.isWaitForSecondNumber = false;
  updateDisplay();
}

function inputDigit(digit) {
  if (calculator.displayNumber === '0' || calculator.isWaitForSecondNumber) {
      calculator.displayNumber = digit;
      calculator.isWaitForSecondNumber = false;
  } else {
      calculator.displayNumber += digit;
  }
  updateDisplay();
}

const buttons = document.querySelectorAll('.button');

for (const button of buttons) {
  button.addEventListener('click', function (event) {
      const target = event.target;

      if (target.id === 'clear') {
          clearCalculator();
      } else if (target.id === 'negative') {
          inverseNumber();
      } else if (target.id === 'equals') {
          performCalculation();
      } else if (target.classList.contains('operator')) {
          handleOperator(target.innerText);
      } else {
          inputDigit(target.innerText);
      }
  });
}

function inverseNumber() {
  if (calculator.displayNumber === '0') {
      return;
  }
  calculator.displayNumber = (-1 * parseFloat(calculator.displayNumber)).toString();
  updateDisplay();
}

function handleOperator(operator) {
  if (!calculator.isWaitForSecondNumber) {
      calculator.operator = operator;
      calculator.isWaitForSecondNumber = true;
      calculator.firstNumber = calculator.displayNumber;
      calculator.displayNumber = '0';
  } else {
      alert('Operator sudah ditetapkan');
  }
}

function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
      alert('Anda belum menetapkan operator');
      return;
  }

  let result = 0;
  const firstNum = parseFloat(calculator.firstNumber);
  const secondNum = parseFloat(calculator.displayNumber);

  switch (calculator.operator) {
    case '+':
        result = firstNum + secondNum;
        break;
    case '-':
        result = firstNum - secondNum;
        break;
    case '*': // Multiply
        result = firstNum * secondNum;
        break;
    case '/': // Divide
        if (secondNum === 0) {
            alert('Tidak bisa membagi dengan nol');
            clearCalculator();
            return;
        }
        result = firstNum / secondNum;
        break;
    default:
        break;
}

calculator.displayNumber = result.toString();
calculator.operator = null;
calculator.firstNumber = null;
calculator.isWaitForSecondNumber = false;
updateDisplay();
}
