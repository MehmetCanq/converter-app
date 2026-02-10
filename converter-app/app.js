const secim = [Uzunluk, Agırlık, Sıcaklık, Litre,] 
const Uzunluk = ["kilo", "gram", "pound"];
const Agırlık = ["metre", "kilometre", "mile"];
const Sıcaklık = ["santigrat", "fahrenheit", "kelvin"];
const Litre = ["litre", "mililitre", "galon"];

secim.forEach(secim => {
    secim = degisken;
    degisken.addEventListener("click", () => {
        const inputValue = document.getElementById("inputValue").value;
        const conversionType = document.getElementById("conversionType").value;
        for (let i = 0; i < degisken.length; i++) {
            if (conversionType === "Agırlık"&& inputValue !== " "&& !isNaN(inputValue)&& inputValue > 0 && inputValue < 10000 ) {
                if (degisken[i] === KG && inputValue) {
                    kgv = inputValue;
                    gram = kilo * 1000;
                    pound = kilo * 2.20462;
                    console.log(`Kilo: ${kilo} kg, Gram: ${gram} g, Pound: ${pound} lb`);
                }}
            else if (conversionType === "Uzunluk" && inputValue !== " "&& !isNaN(inputValue)&& inputValue > 0 && inputValue < 10000) {
                if (degisken[i] === M) {
                    kgv = inputValue;
                    kilometre = metre / 1000;
                    mile = metre * 0.000621371;
                    console.log(`Metre: ${metre} m, Kilometre: ${kilometre} km, Mile: ${mile} mi`);
                }
            else if (conversionType === "Sıcaklık" && inputValue !== " "&& !isNaN(inputValue)&& inputValue > -273.15 && inputValue < 10000) {
                if (degisken[i] === C) {
                    kgv = inputValue;
                    fahrenheit = (santigrat * 9/5) + 32;
                    kelvin = santigrat + 273.15;
                    console.log(`Santigrat: ${santigrat} °C, Fahrenheit: ${fahrenheit} °F, Kelvin: ${kelvin} K`);
                }
               else if (conversionType === "Litre" && inputValue !== " "&& !isNaN(inputValue)&& inputValue > 0 && inputValue < 10000 ) {
                    if (degisken[i] === L) {
                        kgv = inputValue;
                        mililitre = litre * 1000;
                        galon = litre * 0.264172;
                        console.log(`Litre: ${litre} L, Mililitre: ${mililitre} mL, Galon: ${galon} gal`);
                    }
                }
                else {
                    console.log("Lütfen geçerli bir dönüşüm türü seçin.");
                }

            }
        }
    }
})});

