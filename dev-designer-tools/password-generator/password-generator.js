const generateBtn = document.getElementById('generate-btn');
const passwordOutput = document.getElementById('password-output');

function generatePassword(length = 12) {
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:',.<>/?";

  const allChars = upperCase + lowerCase + numbers + symbols;

  let password = "";

  // Ensure password has at least one char from each category
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password characters so fixed-position chars are randomized
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  return password;
}

generateBtn.addEventListener('click', () => {
  const newPassword = generatePassword(14);  // 14 char length
  passwordOutput.value = newPassword;
});
