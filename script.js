let currentDisplay = document.querySelector(".calc-current");
let historicDisplay = document.querySelector(".calc-history");
let resetDisplay = false;


/*
    Calculator object. Has basic functions (add, subtract, multiply, divide),
    and stores operations in memory.
*/
const Calculator = {
    previousOperand: 0,
    currentOperand: 0,
    operant: "+",
    result: 0,
    displayValue: "",
    memory: "",
    justPressedEqual: false,
    justPressedOperant: false,
    add: function (x, y) {
        let result = +x + +y; // +x converts strings to numbers
        return isNaN(result) ? "Error: Not a number" : result;
    },
    subtract: function (x, y) {
        let result = +x - +y;
        return isNaN(result) ? "Error: Not a number" : result;
    },
    multiply: function (x, y) {
        let result = +x * +y;
        return isNaN(result) ? "Error: Not a number" : result;
    },
    divide: function (x, y) {
        let result = +x / +y;
        return isNaN(result) ? "Error: Not a number" : result;
    },
    clear: function () {

    },
};


/*
    Operate function that takes an operand and two variables, and calls
    the appropriate function from the Calculator object
*/
function operate(operant, x, y) {
    switch (operant) {
        case "+":
            return Calculator.add(x, y);
        case "-":
            return Calculator.subtract(x, y);
        case "*":
            return Calculator.multiply(x, y);
        case "/":
            return Calculator.divide(x, y);
    }
}

/*
    When a button is pressed this function calls a function to do operations, and
    another function to update the display.
*/
function buttonPress(e) {
    update(e.dataset.key);
    updateDisplay(e.dataset.key);

    console.log(Calculator.previousOperand + " " + Calculator.currentOperand + " " + Calculator.operant);
};

/*
    Function that determines what to do each time input is received. The current number
    is updated or a calculation is run.
*/
function update(input) {
    if(input === "=") {
        Calculator.result = operate(Calculator.operant, Calculator.previousOperand, Calculator.currentOperand);
        Calculator.previousOperand = 0;
        Calculator.currentOperand = 0;
        Calculator.operant = "+";
        Calculator.justPressedEqual = true;
    } 
    else if (input === "+" || input === "-" || input === "*" || input === "/") {
        Calculator.justPressedOperant = true;
        if (Calculator.justPressedEqual) {      //Check if the previous button pressed was "="
            Calculator.justPressedEqual = false;
            Calculator.previousOperand = Calculator.result;
        }
        Calculator.previousOperand = operate(Calculator.operant, Calculator.previousOperand, Calculator.currentOperand);
        Calculator.currentOperand = 0;
        Calculator.operant = input;
        Calculator.justPressedEqual = false;
    } 
    else if (input === "DEL") {
        if (Calculator.justPressedEqual) {
            Calculator.justPressedEqual = false;
            Calculator.previousOperand = 0;
        }
        Calculator.currentOperand = Calculator.currentOperand.toString().substring(0, Calculator.currentOperand.length - 1);
        console.log(Calculator.currentOperand);
    } else if (input === "CLR") {
        clear();
    } else { 
        if (Calculator.justPressedEqual) Calculator.justPressedEqual = false;
        Calculator.currentOperand += input;
    }
}

/*
    Updates the calculator display based on input
*/
function updateDisplay(input) {
    if (input === "DEL") {
       currentDisplay.textContent = currentDisplay.textContent.substring(0, currentDisplay.textContent.length - 1);
    } else if (input === "CLR") {
        currentDisplay.textContent = "";
    } else if (input === "=") {
        currentDisplay.textContent = Calculator.result;
        resetDisplay = true;
    } else if (input === "+" || input === "-" || input === "*" || input === "/") {
        currentDisplay.textContent = Calculator.previousOperand;
        resetDisplay = true;
    } else {
        resetDisplay ? currentDisplay.textContent = input : currentDisplay.textContent += input;
        resetDisplay = false;
    }
}

/*
    Resets the calculator's memory and display to the default state.
*/
function clear() {
    currentDisplay.textContent = "";
    Calculator.currentOperand = 0;
    Calculator.previousOperand = 0;
    Calculator.operant = "+";
};

function initialize() {
    const keys = document.querySelectorAll(".key");

    window.addEventListener("keydown", buttonPress)

};

initialize(); 