document.addEventListener("DOMContentLoaded", function () {
  fetch('/components/header.html')
    .then(res => {
      if (!res.ok) throw new Error("Header file not found");
      return res.text();
    })
    .then(data => {
      const placeholder = document.createElement('div');
      placeholder.innerHTML = data;
      document.body.insertBefore(placeholder, document.body.firstChild);

      const body = document.body;
      const menuToggle = document.getElementById('menuToggle');
      const mobileCanvas = document.getElementById('mobileCanvas');
      const closeCanvasBtn = document.getElementById('closeCanvas');

      const toggleThemeDesktop = document.getElementById('toggleTheme');
      const toggleThemeCanvas = document.getElementById('toggleThemeCanvas');

      // 🌙 Apply saved theme
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        loadDarkCSS();
      }

      // 🌙 Toggle theme logic
      function toggleDarkMode() {
        const isDark = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        if (isDark) {
          loadDarkCSS();
        } else {
          removeDarkCSS();
        }
      }

      toggleThemeDesktop?.addEventListener('click', toggleDarkMode);
      toggleThemeCanvas?.addEventListener('click', toggleDarkMode);

      // Open mobile canvas menu
      menuToggle?.addEventListener('click', () => {
        mobileCanvas.classList.add('active');
        // disable body scroll when menu is open
        body.style.overflow = 'hidden';
      });

      // Close mobile canvas menu
      closeCanvasBtn?.addEventListener('click', () => {
        mobileCanvas.classList.remove('active');
        body.style.overflow = '';
      });

      // Close menu if clicking on any canvas nav link
      document.querySelectorAll('.canvas-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileCanvas.classList.remove('active');
          body.style.overflow = '';
        });
      });

      // 🔗 Load dark.css
      function loadDarkCSS() {
        if (!document.getElementById('darkCSS')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/css/dark.css';
          link.id = 'darkCSS';
          document.head.appendChild(link);
        }
      }

      // 🔗 Remove dark.css
      function removeDarkCSS() {
        const existing = document.getElementById('darkCSS');
        if (existing) {
          existing.remove();
        }
      }
    })
    .catch(error => {
      console.error("Header load error:", error.message);
    });
});
