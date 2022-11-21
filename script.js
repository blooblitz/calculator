/*
    Author: Blooblitz
    Date: 2022

    Calculator app for The Odin Project
*/

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
    justPressedDecimal: false,
    add: function (x, y) {
        let result = +x + +y; // +x converts strings to numbers
        return isNaN(result) ? "Error: Not a number" : result;
    },
    subtract: function (x, y) {
        let result = +x - +y;
        return isNaN(result) ? "Error: Not a number" : Math.round((result + Number.EPSILON) * 100) / 100;
    },
    multiply: function (x, y) {
        let result = +x * +y;
        return isNaN(result) ? "Error: Not a number" : result;
    },
    divide: function (x, y) {
        let result = +x / +y;
        //This will round the number to 2 decimal places and ensure correct rounding.
        return isNaN(result) ? "Error: Not a number" : Math.round((result + Number.EPSILON) * 100) / 100;
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
    When a button is pressed this function calls a function to do operations and update the display.
*/
function buttonPress(e) {
    update(e.dataset.key);
    //console.log(Calculator.previousOperand + " " + Calculator.currentOperand + " " + Calculator.operant);
};

/*
    Function that determines what to do each time input is received. The current number
    is updated or a calculation is run.
*/
function update(input) {
    if(input === "=") {
        inputEnter()
    } else if (input === "+" || input === "-" || input === "*" || input === "/") {
        inputOperant(input)
    } else if (input === "DEL") {
        inputDelete();
    } else if (input === "CLR") {
        inputClear();
    } else if (input === "+/-") {
        inputPlusMinus();
    } else { 
        inputNumber(input);
    }
}

/*
    Handles the enter button being pressed
*/
function inputEnter() {
    Calculator.result = operate(Calculator.operant, Calculator.previousOperand, Calculator.currentOperand);
    historicDisplay.lastChild.textContent += +Calculator.currentOperand + " = " + Calculator.result;
    historicDisplay.appendChild(document.createElement("div"));
    Calculator.previousOperand = 0;
    Calculator.currentOperand = 0;
    Calculator.operant = "+";
    Calculator.justPressedEqual = true;
    currentDisplay.textContent = Calculator.result;
    resetDisplay = true;
}

/*
    Handles the operant button being pressed
*/
function inputOperant(input) {
    Calculator.justPressedOperant = true;
    if (Calculator.justPressedEqual) {      //Check if the previous button pressed was "="
        Calculator.justPressedEqual = false;
        Calculator.previousOperand = Calculator.result;
        historicDisplay.lastChild.textContent += +Calculator.previousOperand + " " + input + " ";
    } else {
        historicDisplay.lastChild.textContent += +Calculator.currentOperand + " " + input + " ";
    }
    Calculator.previousOperand = operate(Calculator.operant, Calculator.previousOperand, Calculator.currentOperand);
    Calculator.currentOperand = 0;
    Calculator.operant = input;
    Calculator.justPressedEqual = false;
    currentDisplay.textContent = Calculator.previousOperand;
    resetDisplay = true;
}

/*
    Handles the delete button being pressed
*/
function inputDelete() {
    if (Calculator.justPressedEqual) {
        Calculator.justPressedEqual = false;
        Calculator.previousOperand = 0;
    }
    Calculator.currentOperand = Calculator.currentOperand.toString().substring(0, Calculator.currentOperand.length - 1);
    currentDisplay.textContent = currentDisplay.textContent.substring(0, currentDisplay.textContent.length - 1);
}

/*
    Resets the calculator's memory and display to the default state.
*/
function inputClear() {
    currentDisplay.textContent = "";
    Calculator.currentOperand = 0;
    Calculator.previousOperand = 0;
    Calculator.operant = "+";
    currentDisplay.textContent = "";
    while (historicDisplay.firstChild) {
        historicDisplay.removeChild(historicDisplay.firstChild);
    }
    historicDisplay.appendChild(document.createElement("div"));
}

/*
    Flips current number to positive/negative
*/
function inputPlusMinus() {
    if (Calculator.justPressedEqual) {
        Calculator.result *= -1;
        currentDisplay.textContent = Calculator.result;
    } else {
        Calculator.currentOperand *= -1;
        currentDisplay.textContent = Calculator.currentOperand;
    }
}

/*
    Handles a number or decimal button being pressed
*/
function inputNumber(input) {
    if (Calculator.justPressedEqual) Calculator.justPressedEqual = false;
    Calculator.currentOperand += input;
    resetDisplay ? currentDisplay.textContent = input : currentDisplay.textContent += input;
    resetDisplay = false;
}

/*
    Adds event listeners and sets up keys
*/
function initialize() {
    const keys = document.querySelectorAll(".key");

    window.addEventListener("keydown", (event) => {
        event.preventDefault();
        let name = event.key;
        if (name >= 0 && name <= 9) inputNumber(name);
        else if (name === "."|| name === "=" || name === "Enter") inputEnter();
        else if (name === "Backspace" || name === "Delete") inputDelete();
        else if (name === "+" || name === "-" || name === "*" || name === "/") inputOperant(name);
        else if (name === "Escape") inputClear();
      }, false);

};

initialize(); 