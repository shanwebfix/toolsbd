const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const calcBtn = document.getElementById('calc-btn');
const resultDiv = document.getElementById('result');

function calculateBMI(heightCm, weightKg) {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return bmi.toFixed(1);
}

function getStatus(bmi) {
  if (bmi < 18.5) return "Underweight 😟";
  else if (bmi < 25) return "Normal ✅";
  else if (bmi < 30) return "Overweight ⚠️";
  else return "Obese ❌";
}

calcBtn.addEventListener('click', () => {
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  if (!height || !weight || height <= 0 || weight <= 0) {
    resultDiv.textContent = "Please enter valid height and weight.";
    resultDiv.style.color = "#f87171";
    return;
  }

  const bmi = calculateBMI(height, weight);
  const status = getStatus(bmi);

  resultDiv.innerHTML = `Your BMI is <strong>${bmi}</strong><br>Status: ${status}`;
  resultDiv.style.color = "#93c5fd";
});
