console.log("Welcome to calculator");
document.getElementById("result").value = ''; // to get clear screen on loading
let result = '';
const num = [];                                //number array to save digits pressed
let operator = '';                             //to save opearor key pressed                 
let firstNumber = '';                          //to save first number
let secondNumber = '';                         //to save second number
let previousKey = 'none';
let displayValue = '';
let decimal = false;
let activeAction = '';                        // to save operator active and depressed
let calculatedObject = {
    number1: '',
    number2: '',
    op: ''
}
// let op_arr = ['add','subtract','multiply','divide'];
let op_button;

// Function to operate and give result
function operate(num1, num2, operator) {
    if (operator == '+') {
        result = add(num1, num2);
    } else if (operator == '-') {
        result = subtract(num1, num2);
    } else if (operator == '*') {
        result = multiply(num1, num2);
    } else {
        result = divide(num1, num2);
        if (result == "error") { console.log("error"); return "Error"; }
    }
    // return result.toFixed(2);
    return Math.round(result * 100) / 100;
}

// Math function definitions
function add(num1, num2) {
    return num1 + num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    if (num2 == 0) {
        console.log("dividing by zero so error message");
        return "error";
    }
    return num1 / num2;
}

//function to show depressed state of operator
function active(key) {
    // console.log(key)
    if (previousKey == "=" && !firstNumber) {
        op_button = document.getElementById(key);
        return;
    }
    if (key == 'add' || key == 'subtract' || key == 'multiply' || key == 'divide') {
        if (activeAction) {
            op_button = document.getElementById(activeAction);
            op_button.classList.remove("isDepressed");
            activeAction = '';
        }
        op_button = document.getElementById(key);
        op_button.classList.add("isDepressed");
        activeAction = key;
        if (previousKey == 'none' || previousKey == 'clear') {
            op_button.classList.remove("isDepressed");
        }
    } else {
        if (activeAction) {
            op_button = document.getElementById(activeAction);
            op_button.classList.remove("isDepressed");
            activeAction = '';
        }
    }
}

// To clear the display when c is pressed
function clearDisplay() {
    document.getElementById("result").value = '';
    operator = '';
    firstNumber = '';
    secondNumber = '';
    decimal = false;
    while (num.length > 0) {
        num.pop();  //emptying the array
    }
    //console.log("previous key is : " + previousKey);
    previousKey = "clear";
    calculatedObject.number1 = '';
    calculatedObject.number2 = '';
    calculatedObject.op = '';
    //console.log("num array after clear: "+ num)
}

// to undo number if wrong number input 
function backspace() {
    if (previousKey == "=") {
        clearDisplay();
    }
    displayValue = document.getElementById("result").value;
    if (displayValue) {
        //console.log("num array" + num);
        //console.log("display value before backspace:" + displayValue);
        num.pop();
        displayValue = '';
        for (i = 0; i < num.length; i++) {
            displayValue += num[i];
        }
        //console.log("displaye value after backspace:" + displayValue);
        document.getElementById("result").value = displayValue;
        if (displayValue.includes('.')) {
            decimal = true;
        } else {
            decimal = false;
        }
    }
}

function display(key) {
    //console.log("previous key is : " + previousKey);
    if (previousKey == "digit") {
        if (document.getElementById("result").value == '0') {
            document.getElementById("result").value = '';
        }
    }
    if (previousKey == "=") {
        // **************************editing here for operator after calculate start***********************
        if (key == '+' || key == '-' || key == '*' || key == '/') {
            displayValue = document.getElementById("result").value;      // if operator is pressedd after trying to divide by zero
            if (displayValue == 'Error') {
                document.getElementById("result").value = '';
                return key;
            } else {
                firstNumber = document.getElementById("result").value;
                if (firstNumber == 0) {
                    //console.log("removing 0 as it is not considered first no")
                    firstNumber = '';
                }
                console.log("First number when operator is pressed after =" + firstNumber)
                //console.log( + ".....")
                document.getElementById("result").value = '';
                operator = key;
                // previousKey = "operator";
                previousKey = "none"
                return key;
            }
        } else if (key == '.') {
            decimal = false;                   //here making this zero because after equals if decimal is pressed it is new number
            //console.log("entering new number with decimal point");
            // document.getElementById("result").value = '0';
        } else {
            decimal = false;                          //here decimal false after calculation of "="
            document.getElementById("result").value = '';
            previousKey = "none";
        }
    }
    if (previousKey == "operator") {
        if (key == '+' || key == '-' || key == '*' || key == '/') {
            previousKey = 'operator';
            operator = key;
        } else {
            // console.log("in operator repeat ")
            previousKey = "none"
            document.getElementById("result").value = '' //empty the screen when pressing digit after previous  operator 
        }
    }

    //if decimal is pressed multiple time at start we want only one decimal
    if (previousKey == "decimal" && key == '.') {
        if (document.getElementById("result").value == '0.') {
            return key;
        } else {
            document.getElementById("result").value = '0.'
        }
    }
    document.getElementById("result").value += key;
    //console.log("key pressed : " + key);
    if (key == '+' || key == '-' || key == '*' || key == '/') {
        if (previousKey === 'none' || previousKey === "clear") {
            document.getElementById("result").value = '';//to claer display if pressing = or operator before numbers
            return key;
        }
        decimal = false;
        previousKey = "operator";     // console.log("key is digit so making previouskey as operator false if true");
        document.getElementById("result").value = '';
        if (!firstNumber) {
            //console.log(`in operator ${key} block`);
            operator = key;
            for (i = 0; i < num.length; i++) {
                firstNumber += num[i];
            }
            console.log(`firstNumber is ${firstNumber}`);
            while (num.length > 0) {
                num.pop();  //emptying the array
            }
        } else {
            console.log(`we have first number ${firstNumber} lets get second number`);
            // console.log("num array : " + num);
            for (i = 0; i < num.length; i++) {
                secondNumber += num[i];
            }
            console.log(`second number is ${secondNumber}`);
            while (num.length > 0) {
                num.pop();  //emptying the array
            }
            // console.log("num array after getting second number: " + num);
        }
        if (firstNumber && secondNumber && operator) {
            document.getElementById("result").value = '';
            console.log(`we have 2 operands ${firstNumber}, ${secondNumber}  and operator ${operator}`);
            result = operate(Number(firstNumber), Number(secondNumber), operator);
            console.log("result = " + result);
            document.getElementById("result").value = result;
            operator = key;
            previousKey = "operator";
            firstNumber = result;
            secondNumber = '';
            while (num.length > 0) {
                num.pop();  //emptying the array
            }
        }
    } else if (key == '.') {
        // console.log("decimal point....");
        // console.log("decimal active : " + decimal);
        if (num.length == 0 || num[0] == 0) {
            document.getElementById("result").value = '0.'
        }
        if (!decimal) {
            displayValue = document.getElementById("result").value;
            console.log("displayed value is : " + displayValue);
            if (!displayValue.includes('.')) {
                document.getElementById("result").value += key;
                decimal = true;
            } else {
                console.log("else value is : " + displayValue);
                displayValue = '';
            }
            decimal = true;
            previousKey = "decimal";
            num.push(key);
            // console.log("num array : " + num);
        } else {
            console.log("cannot have 2 decimals");
            // displayValue = document.getElementById("result").value
            // console.log("display value+" + displayValue)
            document.getElementById("result").value = '';
            document.getElementById("result").value = displayValue;
            displayValue = '';
        }
    } else {
        displayValue = document.getElementById("result").value;
        //console.log("digit on display : " + displayValue);
        previousKey = "digit";
        num.push(key);
    }
}

function calculate() {
    console.log("calculating...")
    if (previousKey == "=") {
        if (calculatedObject.number1 && calculatedObject.number2 && calculatedObject.op) {
            // //adding code here if previous key is equals and user presses euals again then previous result becomes first number and previous second number is second number for operate
            console.log("equals again after equals before...");
            if (calculatedObject.number1 != "Error") {
                console.log(`number1 = ${calculatedObject.number1} , number2 = ${calculatedObject.number2}, operator= ${calculatedObject.op}`)
                result = operate(Number(calculatedObject.number1), Number(calculatedObject.number2), calculatedObject.op);
                document.getElementById("result").value = result;
                calculatedObject.number1 = result;
                return;
            }else{
                //console.log("errorerror");
                document.getElementById("result").value = '';
                calculatedObject.number1 = '';
                return;
            }

        } else {
            displayValue = document.getElementById("result").value;
            firstNumber += displayValue;
        }
    }
    //console.log("num array : " + num);
    //console.log(`calculating this ${firstNumber} ${operator} ${secondNumber}`);
    if (firstNumber && secondNumber && operator) {
        // console.log("here1");
        // console.log("we have 2 operands and operator");
        console.log(`calculating this ${firstNumber} ${operator} ${secondNumber}`)
        result = operate(Number(firstNumber), Number(secondNumber), operator);
        console.log("result = " + result);
        document.getElementById("result").value = result;
        previousKey = "=";
        operator = '';
        firstNumber = '';
        secondNumber = '';
    }
    if (firstNumber) {
        if (operator) {
            //console.log("here2");
            secondNumber = document.getElementById("result").value;
            // if user presses euals after first number and an operator treate first number as also second number 
            // ex 2+= => 2+2=4
            if (!secondNumber) {
                secondNumber = firstNumber;
            }
            //console.log("second number = " + secondNumber)
            console.log(`calculating this ${firstNumber} ${operator} ${secondNumber}`)
            result = operate(Number(firstNumber), Number(secondNumber), operator);
            calculatedObject.number2 = secondNumber; //to store every calculate operator and operand
            calculatedObject.number1 = result;
            calculatedObject.op = operator;
            console.log(`number1 = ${calculatedObject.number1} , number2 = ${calculatedObject.number2}, operator= ${calculatedObject.op}`)
            console.log(`result = ${result}`);
            document.getElementById("result").value = result;
            previousKey = "=";
            operator = '';
            firstNumber = '';
            secondNumber = '';
        } else {
            //console.log("here3");
            document.getElementById("result").value = firstNumber;
            previousKey = "=";
            operator = '';
            firstNumber = '';
            secondNumber = '';
        }
    } else {
        //console.log("here4");
        firstNumber = document.getElementById("result").value;
        console.log("fisrt number = " + firstNumber);
        if (num.length > 0) {
            if (num[0] == '.') {
                num.unshift('0');
            }
            if (num[num.length - 1] == '.') {
                num.pop();
            }
            // for (i = 0; i < num.length; i++) {
            //     firstNumber += num[i];
            // }
        }
        if (!firstNumber) {
            document.getElementById("result").value = '0';
        } else {
            document.getElementById("result").value = firstNumber;
        }
        previousKey = "=";
        operator = '';
        firstNumber = '';
        secondNumber = '';
    }
    while (num.length > 0) {
        num.pop();
    }
}





