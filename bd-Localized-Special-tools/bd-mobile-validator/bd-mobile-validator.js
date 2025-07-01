const input = document.getElementById('mobile-input');
const validateBtn = document.getElementById('validate-btn');
const resultDiv = document.getElementById('result');

// Regex to match Bangladeshi mobile numbers
const bdMobileRegex = /^(013|014|015|016|017|018|019)\d{8}$/;

validateBtn.addEventListener('click', () => {
  const number = input.value.trim();

  if (bdMobileRegex.test(number)) {
    resultDiv.textContent = "✅ Valid BD Mobile Number";
    resultDiv.style.color = "#22c55e"; // green
  } else {
    resultDiv.textContent = "❌ Invalid Number";
    resultDiv.style.color = "#f43f5e"; // red
  }
});
