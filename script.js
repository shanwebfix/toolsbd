 // io
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
    }
  });


// 📦 ইউটিলিটি ফাংশন: ইংরেজি সংখ্যা → বাংলা সংখ্যা
function banglaDigit(num) {
  const en = '0123456789'.split('');
  const bn = '০১২৩৪৫৬৭৮৯'.split('');
  return num.toString().split('').map(d => en.includes(d) ? bn[en.indexOf(d)] : d).join('');
}

// 🕐 টাইম কনভার্টার: HH:MM → বাংলা AM/PM সহ
function formatTimeToBangla(timeStr) {
  let [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'পি.এম' : 'এ.এম';
  h = h % 12 || 12;
  return `${banglaDigit(h)}:${banglaDigit(m)} ${ampm}`;
}

// 📍 লোকেশন নাম বের করা এবং ঠিকানাসহ ফেরত দেওয়া
async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const address = data.address;
    const locationName =
      address.hamlet ||
      address.suburb ||
      address.village ||
      address.town ||
      address.county ||
      address.city ||
      address.district ||
      address.state ||
      "অজানা";

    const full = [
      address.hamlet,
      address.suburb,
      address.village,
      address.town,
      address.county,
      address.district,
      address.state
    ]
      .filter(Boolean)
      .join(", ");

    return { name: locationName, full };
  } catch {
    return { name: "অজানা", full: "Bangladesh" };
  }
}

// 🕌 নামাজের সময় লোড (সঠিক location ভিত্তিক)
async function getPrayerTimes(lat, lon, displayName) {
  const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2&school=1`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const t = data.data.timings;

    document.getElementById("location").textContent = `📍 লোকেশন: ${displayName}`;

    const prayers = [
      { name: "🕋 ফজর", time: t.Fajr },
      { name: "🌅 সূর্যোদয়", time: t.Sunrise },
      { name: "🕌 যোহর", time: t.Dhuhr },
      { name: "🕒 আসর", time: t.Asr },
      { name: "🌇 মাগরিব", time: t.Maghrib },
      { name: "🌙 এশা", time: t.Isha }
    ];

    document.getElementById("prayer-list").innerHTML = prayers.map(p => `
      <p>${p.name} — ${formatTimeToBangla(p.time)}</p>
    `).join('');
  } catch (err) {
    document.getElementById("prayer-list").innerHTML = `<p>❌ নামাজের সময় লোড ব্যর্থ</p>`;
  }
}

// 🧭 ইউজার লোকেশন ধরো এবং লোড করো
function getUserLocation() {
  if (!navigator.geolocation) {
    document.getElementById("location").textContent = "⚠️ লোকেশন পাওয়া যায়নি";
    return;
  }

  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const location = await reverseGeocode(lat, lon);
    await getPrayerTimes(lat, lon, location.full);
  }, () => {
    const fallbackLat = 23.8103;
    const fallbackLon = 90.4125;
    getPrayerTimes(fallbackLat, fallbackLon, "ঢাকা");
    document.getElementById("location").textContent = `📍 লোকেশন: ঢাকা`;
  });
}

// 🚀 শুরু করো
getUserLocation();













// English Date
const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const banglaMonths = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
const banglaWeekdays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];

// ইংরেজি সংখ্যা, আরবি সংখ্যা → বাংলা সংখ্যা কনভার্টার
function convertToBanglaNumber(str) {
  const en = "0123456789";
  const ar = "٠١٢٣٤٥٦٧٨٩";
  return str.toString().split('').map(char => {
    if (en.includes(char)) return banglaNumbers[parseInt(char)];
    if (ar.includes(char)) return banglaNumbers[ar.indexOf(char)];
    return char;
  }).join('');
}

// বাংলা তারিখ
const today = new Date();
const bdDay = convertToBanglaNumber(today.getDate());
const bdMonth = banglaMonths[today.getMonth()];
const bdYear = convertToBanglaNumber(today.getFullYear());
const bdWeekday = banglaWeekdays[today.getDay()];
document.getElementById("bangla-date").innerText = `${bdWeekday}, ${bdDay} ${bdMonth}, ${bdYear}`;

// ইংরেজি তারিখ
const englishDate = today.toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
});
document.getElementById("english-date").innerText = englishDate;

// ইসলামিক তারিখ বাংলা সংখ্যায়
const islamicFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
  day: "numeric",
  month: "long",
  year: "numeric"
});
const parts = islamicFormatter.formatToParts(today);

// আরবি মাস বাংলায়
const arabicToBanglaMonth = {
  "محرم": "মুহাররম",
  "صفر": "সফর",
  "ربيع الأول": "রবিউল আউয়াল",
  "ربيع الآخر": "রবিউস সানি",
  "جمادى الأولى": "জুমাদাল উলা",
  "جمادى الآخرة": "জুমাদাল সানি",
  "رجب": "রজব",
  "شعبان": "শাবান",
  "رمضان": "রমজান",
  "شوال": "শাওয়াল",
  "ذو القعدة": "জ্বিলকদ",
  "ذو الحجة": "জ্বিলহজ্জ"
};

let islDay = "", islMonth = "", islYear = "";

parts.forEach(part => {
  if (part.type === "day") islDay = convertToBanglaNumber(part.value);
  if (part.type === "month") islMonth = arabicToBanglaMonth[part.value] || part.value;
  if (part.type === "year") islYear = convertToBanglaNumber(part.value);
});

document.getElementById("arabic-date").innerText = `${islDay} ${islMonth} ${islYear}`;

