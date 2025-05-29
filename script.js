(() => {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.btn');
  let currentInput = '0';
  let previousInput = null;
  let operator = null;
  let resetNext = false; // flag to reset input on next number after operation

  function updateDisplay(value) {
    display.textContent = value;
  }

  function appendNumber(num) {
    if (resetNext) {
      currentInput = num;
      resetNext = false;
    } else {
      if (currentInput === '0' && num !== '.') {
        currentInput = num;
      } else {
        currentInput += num;
      }
    }
    updateDisplay(currentInput);
  }

  function chooseOperator(op) {
    if (operator !== null && !resetNext) {
      calculate();
    }
    previousInput = parseFloat(currentInput);
    operator = op;
    resetNext = true;
  }

  function calculate() {
    if (operator === null || resetNext) return;
    const current = parseFloat(currentInput);
    let result = null;

    switch(operator) {
      case 'add':
        result = previousInput + current;
        break;
      case 'subtract':
        result = previousInput - current;
        break;
      case 'multiply':
        result = previousInput * current;
        break;
      case 'divide':
        if (current === 0) {
          alert("Error: Division by zero");
          clearAll();
          return;
        }
        result = previousInput / current;
        break;
    }
    if (result !== null) {
      currentInput = String(result);
      updateDisplay(currentInput);
      operator = null;
      previousInput = null;
      resetNext = true;
    }
  }

  function clearAll() {
    currentInput = '0';
    previousInput = null;
    operator = null;
    resetNext = false;
    updateDisplay(currentInput);
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.id === 'clear') {
        clearAll();
      } else if (button.id === 'equals') {
        calculate();
      } else if (button.id === 'decimal') {
        if (!currentInput.includes('.')) {
          appendNumber('.');
        }
      } else if (button.dataset.num !== undefined) {
        appendNumber(button.dataset.num);
      } else if (button.dataset.action !== undefined) {
        chooseOperator(button.dataset.action);
      }
    });
  });

  // initialize display
  updateDisplay(currentInput);
})();
