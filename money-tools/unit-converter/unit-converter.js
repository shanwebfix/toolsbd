const converterType = document.getElementById('converter-type');
const inputValue = document.getElementById('input-value');
const inputUnit = document.getElementById('input-unit');
const outputUnit = document.getElementById('output-unit');
const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');

// Units data
const units = {
  length: [
    { name: "Meter", value: "m" },
    { name: "Kilometer", value: "km" }
  ],
  weight: [
    { name: "Gram", value: "g" },
    { name: "Kilogram", value: "kg" }
  ],
  temperature: [
    { name: "Celsius", value: "c" },
    { name: "Fahrenheit", value: "f" }
  ],
  currency: [
    { name: "USD", value: "usd" },
    { name: "BDT", value: "bdt" }
  ]
};

// Currency manual rate (BDT per 1 USD)
const currencyRate = 105; // change as needed

// Populate input/output unit selects based on selected converter type
function populateUnits(type) {
  inputUnit.innerHTML = "";
  outputUnit.innerHTML = "";
  units[type].forEach(unit => {
    const option1 = document.createElement('option');
    option1.value = unit.value;
    option1.textContent = unit.name;
    inputUnit.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = unit.value;
    option2.textContent = unit.name;
    outputUnit.appendChild(option2);
  });

  // Default selections
  inputUnit.selectedIndex = 0;
  outputUnit.selectedIndex = 1;
  resultDiv.textContent = "";
  inputValue.value = "";
}

converterType.addEventListener('change', () => {
  populateUnits(converterType.value);
});

function convert() {
  const val = parseFloat(inputValue.value);
  if (isNaN(val)) {
    alert("Please enter a valid number");
    return;
  }
  const from = inputUnit.value;
  const to = outputUnit.value;

  if (from === to) {
    resultDiv.textContent = `Result: ${val} (same units)`;
    return;
  }

  let converted;

  switch (converterType.value) {
    case "length":
      // Meter ↔ Kilometer
      if (from === "m" && to === "km") {
        converted = val / 1000;
      } else if (from === "km" && to === "m") {
        converted = val * 1000;
      }
      break;

    case "weight":
      // Gram ↔ Kilogram
      if (from === "g" && to === "kg") {
        converted = val / 1000;
      } else if (from === "kg" && to === "g") {
        converted = val * 1000;
      }
      break;

    case "temperature":
      // Celsius ↔ Fahrenheit
      if (from === "c" && to === "f") {
        converted = (val * 9/5) + 32;
      } else if (from === "f" && to === "c") {
        converted = (val - 32) * 5/9;
      }
      break;

    case "currency":
      // USD ↔ BDT
      if (from === "usd" && to === "bdt") {
        converted = val * currencyRate;
      } else if (from === "bdt" && to === "usd") {
        converted = val / currencyRate;
      }
      break;

    default:
      converted = null;
  }

  if (converted !== null) {
    resultDiv.textContent = `Result: ${converted.toFixed(4)}`;
  } else {
    resultDiv.textContent = "Conversion not supported.";
  }
}

// Initial populate
populateUnits(converterType.value);

convertBtn.addEventListener('click', convert);
