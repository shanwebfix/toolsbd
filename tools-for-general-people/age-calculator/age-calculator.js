const calcBtn = document.getElementById('calc-btn');
const dobInput = document.getElementById('dob');
const resultEn = document.getElementById('result-en');
const resultBn = document.getElementById('result-bn');

// Bangla numbers map
const banglaDigits = {
  0: '০',
  1: '১',
  2: '২',
  3: '৩',
  4: '৪',
  5: '৫',
  6: '৬',
  7: '৭',
  8: '৮',
  9: '৯'
};

function toBanglaNumber(num) {
  return num.toString().split('').map(d => banglaDigits[d] || d).join('');
}

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

calcBtn.addEventListener('click', () => {
  const dob = dobInput.value;
  if (!dob) {
    alert("Please select your date of birth.");
    return;
  }

  const { years, months, days } = calculateAge(dob);

  // English
  resultEn.textContent = `You are ${years} years, ${months} months, and ${days} days old.`;

  // Bangla
  resultBn.textContent = `আপনার বয়স ${toBanglaNumber(years)} বছর, ${toBanglaNumber(months)} মাস, ${toBanglaNumber(days)} দিন।`;
});
