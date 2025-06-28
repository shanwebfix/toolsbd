document.addEventListener("DOMContentLoaded", function () {
  fetch('/components/footer.html')
    .then(res => {
      if (!res.ok) {
        throw new Error("Footer file not found");
      }
      return res.text();
    })
    .then(data => {
      // Footer DOM তৈরি করে body-এর শেষে যোগ করা
      const placeholder = document.createElement('div');
      placeholder.innerHTML = data;
      document.body.appendChild(placeholder);
    })
    .catch(error => {
      console.error("Footer load error:", error.message);
    });
});
