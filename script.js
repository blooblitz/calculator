initialize();

/*
    Calculator object. Has basic functions (add, subtract, multiply, divide),
    and stores operations in memory.
*/
const Calculator = {
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
function operate(operand, x, y) {
    switch (operand) {
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

function buttonPress(e) {
    //if(e.dataset.key) console.log("Key");
    //let m = e.dataset.key;
    console.log(e);
};

function changeColor() {
    console.log("TEST");
};

function initialize() {
    const keys = document.querySelectorAll(".key");

    window.addEventListener("keydown", buttonPress)
};