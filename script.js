const mycalc = document.getElementById('mycalc');

const display = document.createElement('div');
display.className = 'display mb-3';
display.textContent = '0';
mycalc.appendChild(display);


const layout = [
  ['C', '←', '.', '×'],
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '00', '=']
];

let expression ='';

layout.forEach(row => {
  const rowDiv = document.createElement('div');
  rowDiv.className = 'd-flex justify-content-between mb-2';

  row.forEach(char => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-light me-2';
    btn.textContent = char;

    
    if (char === 'C') btn.classList.add('btn-clear');
    if (['+', '-', '×', '÷'].includes(char)) btn.classList.add('btn-op');
    if (char === '=') btn.classList.add('btn-equal', 'flex-grow-1');

    btn.addEventListener('click', () => handleInput(char));
    rowDiv.appendChild(btn);
  });

  mycalc.appendChild(rowDiv);
});

document.addEventListener('keydown', (e) => {
  const key = e.key;

  
  if (!isAllowedKey(key)) {
      alert('Only numbers and valid operators are allowed');
      return;
    }

    if (key === 'Enter') return handleInput('=');
    if (key === 'Backspace') return handleInput('←');
    if (key === 'c' || key === 'C') return handleInput('C');
  
    if (/^[0-9+\-*/.%]$/.test(key)) {
      const converted = key === '*' ? '×' : key === '/' ? '÷' : key;
      handleInput(converted);
    }
 else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
  } else if (key.toLowerCase() === 'c') {
    expression = '';
  } else {
    expression += key;
  }

  display.textContent = expression || '0';
});

function handleInput(char) {
    if (char === 'C') {
      expression = '';
    } else if (char === '←') {
      expression = expression.slice(0, -1);
    } else if (char === '=') {
      try {
        const result = eval(expression.replace(/×/g, '*').replace(/÷/g, '/'));
        expression = result.toString();
      } catch {
        expression = 'Error';
      }
    } else {
      expression += char;
    }
    display.textContent = expression || '0';
}
function isAllowedKey(key) {
  const allowed = /^[0-9+\-*/%.]$/;
  return allowed.test(key) || ['Enter', 'Backspace', '=', 'c', 'C'].includes(key);
}
