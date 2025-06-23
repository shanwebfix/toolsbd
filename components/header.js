document.addEventListener("DOMContentLoaded", function () {
  fetch('/components/header.html')
    .then(res => {
      if (!res.ok) {
        throw new Error("Header file not found");
      }
      return res.text();
    })
    .then(data => {
      // Header DOM create করে body র মধ্যে প্রথমে ঢোকানো
      const placeholder = document.createElement('div');
      placeholder.innerHTML = data;
      document.body.insertBefore(placeholder, document.body.firstChild);

      // Menu toggle button click handle করা
      const menuToggle = document.getElementById('menuToggle');
      const navMenu = document.getElementById('navMenu');

      if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
          navMenu.classList.toggle('active');
        });
      } else {
        console.warn("Menu toggle or navMenu not found in the loaded header.");
      }
    })
    .catch(error => {
      console.error("Header load error:", error.message);
    });
});
