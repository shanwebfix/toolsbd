// বাংলা মাসের নাম
const banglaMonths = [
  "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন",
  "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"
];

// Gregorian Leap Year Check
function isLeapYear(year) {
  return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

// ইংরেজি তারিখ থেকে বাংলা তারিখ রূপান্তর ফাংশন
function convertToBanglaDate(gregorianDate) {
  const date = new Date(gregorianDate);
  if (isNaN(date)) return null;

  const gy = date.getFullYear();
  const gm = date.getMonth() + 1; // 1-based
  const gd = date.getDate();

  // বাংলা বছর হিসাব
  let banglaYear;
  if (gm > 4 || (gm === 4 && gd >= 14)) {
    banglaYear = gy - 593;
  } else {
    banglaYear = gy - 594;
  }

  // বাংলা মাসের শুরু ইংরেজি তারিখ ও মাস
  const banglaMonthStartDates = [
    { month: 4, day: 14 },  // বৈশাখ
    { month: 5, day: 15 },  // জ্যৈষ্ঠ
    { month: 6, day: 15 },  // আষাঢ়
    { month: 7, day: 16 },  // শ্রাবণ
    { month: 8, day: 16 },  // ভাদ্র
    { month: 9, day: 16 },  // আশ্বিন
    { month: 10, day: 16 }, // কার্তিক
    { month: 11, day: 15 }, // অগ্রহায়ণ
    { month: 12, day: 15 }, // পৌষ
    { month: 1, day: 14 },  // মাঘ
    { month: 2, day: 13 },  // ফাল্গুন
    { month: 3, day: 15 },  // চৈত্র
  ];

  const falgunLength = isLeapYear(gy) ? 30 : 29;

  // মাসের দৈর্ঘ্য
  const monthLengths = [
    31, 31, 31, 31, 31, 30, 30, 30, 30, 30, falgunLength, 30
  ];

  // দুই তারিখের মধ্যে দিনের পার্থক্য হিসাব
  function daysDiff(year, month, day, baseMonth, baseDay) {
    let d1 = new Date(year, month - 1, day);
    let d2;
    if (baseMonth < month || (baseMonth === month && baseDay <= day)) {
      d2 = new Date(year, baseMonth - 1, baseDay);
    } else {
      d2 = new Date(year - 1, baseMonth - 1, baseDay);
    }
    let diffTime = d1 - d2;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  // বাংলা মাস ও তারিখ বের করা
  let banglaMonthIndex = 0;
  let banglaDay = 0;

  for (let i = 0; i < banglaMonthStartDates.length; i++) {
    const { month: bm, day: bd } = banglaMonthStartDates[i];
    const diff = daysDiff(gy, gm, gd, bm, bd);

    if (diff >= 0) {
      banglaMonthIndex = i;
      banglaDay = diff + 1;
    }
  }

  // মাসের দৈর্ঘ্যের বাইরে গেলে পরের মাসের ১ তারিখ
  if (banglaDay > monthLengths[banglaMonthIndex]) {
    banglaDay = 1;
    banglaMonthIndex = (banglaMonthIndex + 1) % 12;

    // বছর পরিবর্তন (চৈত্র থেকে বৈশাখ গেলে)
    if (banglaMonthIndex === 0 && gm >= 4) {
      banglaYear += 1;
    }
  }

  return {
    year: banglaYear,
    month: banglaMonths[banglaMonthIndex],
    day: banglaDay
  };
}

document.getElementById('convert-btn').addEventListener('click', () => {
  const inputDate = document.getElementById('gregorian-date').value;
  if (!inputDate) {
    alert('অনুগ্রহ করে ইংরেজি তারিখ নির্বাচন করুন।');
    return;
  }

  const banglaDate = convertToBanglaDate(inputDate);
  if (!banglaDate) {
    document.getElementById('result').textContent = 'অবৈধ তারিখ';
    return;
  }

  document.getElementById('result').textContent =
    `${banglaDate.year} সন, ${banglaDate.month} ${banglaDate.day} তারিখ`;
});
