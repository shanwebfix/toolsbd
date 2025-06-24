const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});




// Namaj Time
function getPrayerTimes(lat, lon) {
  const today = new Date().toISOString().split("T")[0];
  const url = `https://api.aladhan.com/v1/timings/${today}?latitude=${lat}&longitude=${lon}&method=2`;

  console.log("Fetching prayer times from:", url);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("API response:", data);
      const timings = data.data.timings;
      const locationName = data.data.meta.timezone;

      document.getElementById("location").textContent = `📍 লোকেশন: ${locationName}`;

      const html = `
        🕋 ফজর: ${timings.Fajr} <br>
        🌅 সূর্যোদয়: ${timings.Sunrise} <br>
        🕌 যোহর: ${timings.Dhuhr} <br>
        🕒 আসর: ${timings.Asr} <br>
        🌇 মাগরিব: ${timings.Maghrib} <br>
        🌙 এশা: ${timings.Isha}
      `;

      document.getElementById("prayer-times").innerHTML = html;
    })
    .catch(error => {
      console.error("Prayer API error:", error);
      document.getElementById("prayer-times").textContent = "সময় লোড করতে ব্যর্থ হয়েছে।";
    });
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        console.log("User Location:", lat, lon);
        getPrayerTimes(lat, lon);
      },
      error => {
        console.error("Location error:", error);
        document.getElementById("location").textContent = "লোকেশন এক্সেস পাওয়া যায়নি।";
      }
    );
  } else {
    document.getElementById("location").textContent = "আপনার ব্রাউজারে জিওলোকেশন নেই।";
  }
}

getUserLocation();
