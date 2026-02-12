const categorySelect = document.getElementById("categorySelect");
const fromUnitSelect = document.getElementById("fromUnit");
const toUnitSelect = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const resultText = document.getElementById("resultText");
const swapButton = document.getElementById("swapButton");

function updateOptionStates() {
    const fromValue = fromUnitSelect.value;
    const toValue = toUnitSelect.value;

    for (const option of fromUnitSelect.options) {
        option.disabled = (option.value === toValue);
    }

    for (const option of toUnitSelect.options) {
        option.disabled = (option.value === fromValue);
    }
}

function calculate() {
    updateOptionStates();
    const category = categorySelect.value;
    const from = fromUnitSelect.value;
    const to = toUnitSelect.value;
    const amount = parseFloat(inputValue.value);

    if (category === "length" || category === "weight" || category === "volume"|| from ==="Kelvin") {
        inputValue.value = inputValue.value.replace(/[^0-9.-]/g, '');
    }

    if (isNaN(amount)) {
        resultText.textContent = "Lütfen bir sayı girin!";
        resultText.style.color = "white";
        return;
    }

    if (from === to) {
        resultText.textContent = "Aynı birimleri dönüştüremezsiniz!";
        resultText.style.color = "white";
        return;
    }

    if (amount < 0) {
        if (category === "length" || category === "weight" || category === "volume") {
            resultText.textContent = "Bu değer negatif olamaz!";
            resultText.style.color = "white";
            return;
        }
        if (category === "temperature" && from === "Kelvin") {
            resultText.textContent = "Kelvin negatif olamaz!";
            resultText.style.color = "white";
            return;
        }
        if (category === "temperature" && from === "Celsius" && amount < -273.15) {
            resultText.textContent = "Celsius -273.15'den küçük olmamalı!";
            resultText.style.color = "white";
            return;
        }
    }

    resultText.style.color = "#194472ff";

    let result = 0;

    switch (category) {
        case "weight":
            let gramDegeri = 0;
            if (from === "Kilogram") gramDegeri = amount * 1000;
            else if (from === "Gram") gramDegeri = amount;
            else if (from === "Pound") gramDegeri = amount * 453.592;

            if (to === "Kilogram") result = gramDegeri / 1000;
            else if (to === "Gram") result = gramDegeri;
            else if (to === "Pound") result = gramDegeri / 453.592;
            break;

        case "length":
            let metreDegeri = 0;
            if (from === "Metre") metreDegeri = amount;
            else if (from === "Santimetre") metreDegeri = amount / 100;
            else if (from === "Mil") metreDegeri = amount * 1609.34;
            else if (from === "İnç") metreDegeri = amount * 0.0254;

            if (to === "Metre") result = metreDegeri;
            else if (to === "Santimetre") result = metreDegeri * 100;
            else if (to === "Mil") result = metreDegeri / 1609.34;
            else if (to === "İnç") result = metreDegeri / 0.0254;
            break;

        case "volume":
            let litreDegeri = 0;
            if (from === "Litre") litreDegeri = amount;
            else if (from === "Mililitre") litreDegeri = amount / 1000;
            else if (from === "Galon") litreDegeri = amount * 3.78541;

            if (to === "Litre") result = litreDegeri;
            else if (to === "Mililitre") result = litreDegeri * 1000;
            else if (to === "Galon") result = litreDegeri / 3.78541;
            break;

        case "temperature":
            if (from === "Celsius") {
                if (to === "Fahrenheit") result = (amount * 9 / 5) + 32;
                else if (to === "Kelvin") result = amount + 273.15;
            } else if (from === "Fahrenheit") {
                if (to === "Celsius") result = (amount - 32) * 5 / 9;
                else if (to === "Kelvin") result = (amount - 32) * 5 / 9 + 273.15;
            } else if (from === "Kelvin") {
                if (to === "Celsius") result = amount - 273.15;
                else if (to === "Fahrenheit") result = (amount - 273.15) * 9 / 5 + 32;
            }
            break;
    }
    resultText.style.color = "#ffffffc0";
    resultText.innerHTML = `Sonuç: <b>${result.toFixed(4)}</b> ${to}`;

}

function updateUnits() {
    const category = categorySelect.value;
    let optionsHTML = "";

    switch (category) {
        case "length":
            optionsHTML = `
                <option value="Metre">Metre</option>
                <option value="Santimetre">Santimetre</option>
                <option value="Mil">Mil</option>
                <option value="İnç">İnç</option>
            `;
            break;
        case "weight":
            optionsHTML = `
                <option value="Kilogram">Kilogram</option>
                <option value="Gram">Gram</option>
                <option value="Pound">Pound</option>
            `;
            break;
        case "temperature":
            optionsHTML = `
                <option value="Celsius">Celsius</option>
                <option value="Fahrenheit">Fahrenheit</option>
                <option value="Kelvin">Kelvin</option>
            `;
            break;
        case "volume":
            optionsHTML = `
                <option value="Litre">Litre</option>
                <option value="Mililitre">Mililitre</option>
                <option value="Galon">Galon</option>
            `;
            break;
    }

    fromUnitSelect.innerHTML = optionsHTML;
    toUnitSelect.innerHTML = optionsHTML;
    
    toUnitSelect.options[1].selected = true;

    inputValue.value = "";
    resultText.textContent = "Değer girin...";
    resultText.style.color = "#1a334dff";
    calculate();
}

function swapUnits() {
    const fromValue = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = fromValue;
    calculate();
}

categorySelect.addEventListener("change", updateUnits);
fromUnitSelect.addEventListener("change", calculate);
toUnitSelect.addEventListener("change", calculate);
inputValue.addEventListener("input", calculate);
swapButton.addEventListener("click", swapUnits);


