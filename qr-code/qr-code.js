const generateBtn = document.getElementById('generate-btn');
const urlInput = document.getElementById('url-input');
const qrcodeContainer = document.getElementById('qrcode');

generateBtn.addEventListener('click', () => {
  const url = urlInput.value.trim();
  if (!url) {
    alert('Please enter a valid URL.');
    return;
  }

  qrcodeContainer.innerHTML = ''; // পুরাতন QR কোড মুছে ফেলো

  new QRCode(qrcodeContainer, {
    text: url,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
});
