const copyBtn = document.getElementById("copyBtn");
const resultEl = document.getElementById("passwordView");
const lengthEl = document.getElementById("passLngth");
const range = document.getElementById("range");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");

// Check permissions for clipboard
navigator.permissions.query({ name: "clipboard-write" }).then(result => {
    if (result.state == "granted" || result.state == "prompt") {
        /* write to the clipboard now */
    }
});

// Function to change 
range.addEventListener('input', () => {
    lengthEl.innerText = range.value;
});

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate event listener
generateEl.addEventListener('click', () => {
    const length = +range.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;



    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

// Generate password function 
function generatePassword(upper, lower, number, symbol, length) {

    // Init password var
    let generatedPassword = '';

    // Filter out unchecked types
    const typesCount = lower + upper + number + symbol;

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        return '';
    }

    // Loop over length call generator function for each type
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;

}

// Generator functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*()[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Event listener for copying text
copyBtn.addEventListener('click', () => {

    if (resultEl.value != '') {
        resultEl.select();
        document.execCommand('copy');
        resultEl.blur();
        window.alert("Password copied");
    }

})