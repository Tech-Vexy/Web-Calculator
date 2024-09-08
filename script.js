let Answer = null;
function deleteCharacter() {
    const inputPanel = document.getElementById('inputPanel');
    inputPanel.value = inputPanel.value.trim().slice(0, -1);
}

function appendDigit(digit) {
    const inputPanel = document.getElementById('inputPanel');

    // If Answer is not null, it means we have a previous result to use
    if (inputPanel.value === '' && Answer !== null) {
        inputPanel.value = Answer; // Append the previous answer
    }

    inputPanel.value += digit;
}

function appendOperator(operator) {
    const inputPanel = document.getElementById('inputPanel');

    // If Answer is not null, it means we have a previous result to use
    if (inputPanel.value === '' && Answer !== null) {
        inputPanel.value = Answer; // Append the previous answer
    }

    inputPanel.value += operator;
}


function clearDisplay() {
    document.getElementById('inputPanel').value = '';
    document.getElementById('outputPanel').value = '';
    Answer = null;
}

function calculate() {
    const inputPanel = document.getElementById('inputPanel');
    const outputPanel = document.getElementById('outputPanel');

    try {
        let result = math.evaluate(inputPanel.value); // Use math.js for evaluation
        Answer = result;

        outputPanel.value = result;
        inputPanel.value = '';
    } catch (error) {
        outputPanel.value = 'Error';
    }
}




function calculateFactorial() {
    const inputPanel = document.getElementById('inputPanel');
    const outputPanel = document.getElementById('outputPanel');

    let number = parseInt(inputPanel.value);

    if (isNaN(number) || number < 0) {
        outputPanel.value = 'Error';
        return;
    }

    let result = 1;
    for (let i = number; i > 1; i--) {
        result *= i;
    }

    // Update Answer with the factorial result
    Answer = result;

    // Display the result and clear the input panel
    outputPanel.value = result;
    inputPanel.value = '';
}


// Keyboard support for calculator
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        appendDigit(key); // Handle digit and decimal input
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
        appendOperator(key); // Handle operators
    } else if (key === 'Enter') {
        calculate(); // Handle equals
    } else if (key === 'Backspace') {
        deleteCharacter(); // Handle backspace
    } else if (key === 'Escape') {
        clearDisplay(); // Handle clear
    }
});



window.addEventListener('beforeunload', function() {
    localStorage.setItem('input', document.getElementById('inputPanel').value);
    localStorage.setItem('output', document.getElementById('outputPanel').value);
    localStorage.setItem('answer', Answer);
});

window.addEventListener('load', function() {
    document.getElementById('inputPanel').value = localStorage.getItem('input') || '';
    document.getElementById('outputPanel').value = localStorage.getItem('output') || '';
    Answer = parseFloat(localStorage.getItem('answer')) || null;
});
