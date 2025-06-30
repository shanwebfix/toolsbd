// ✅ Load network info using geolocation-db.com (no token needed)
async function fetchNetworkInfo() {
  const infoDiv = document.getElementById("info");

  try {
    const res = await fetch("https://geolocation-db.com/json/");
    const data = await res.json();

    infoDiv.innerHTML = `
      <strong>IP:</strong> ${data.IPv4}<br>
      <strong>City:</strong> ${data.city || 'N/A'}<br>
      <strong>State:</strong> ${data.state || 'N/A'}<br>
      <strong>Country:</strong> ${data.country_name}<br>
      <strong>Device:</strong> ${navigator.userAgent}
    `;
  } catch (e) {
    infoDiv.innerHTML = `<span style="color: #f87171;">Failed to load network info.</span>`;
    console.error("Info error:", e);
  }
}

fetchNetworkInfo();


// ✅ Speed test function
async function startSpeedTest() {
  const status = document.getElementById("status");
  const mainSpeed = document.getElementById("main-speed");
  const downloadEl = document.getElementById("download");
  const uploadEl = document.getElementById("upload");

  status.textContent = "Testing download speed...";
  mainSpeed.textContent = "--";

  // 🔽 Download speed test
  try {
    const start = performance.now();
    const response = await fetch("https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg", {
      method: "GET",
      headers: { 'Range': 'bytes=0-1000000' }
    });
    const blob = await response.blob();
    const end = performance.now();
    const duration = (end - start) / 1000;
    const bits = blob.size * 8;
    const speedMbps = (bits / duration / 1024 / 1024).toFixed(2);

    downloadEl.textContent = `↓ Download: ${speedMbps} Mbps`;
    mainSpeed.textContent = `${speedMbps} Mbps`;
  } catch (e) {
    downloadEl.textContent = `↓ Download: Failed`;
    console.error("Download error:", e);
  }

  status.textContent = "Testing upload speed...";

  // 🔼 Upload speed test
  try {
    const data = new Blob([new Uint8Array(1_000_000)]); // 1MB dummy data
    const start = performance.now();
    await fetch("https://api.sofy.ai/api/v1/test/upload", {
      method: "POST",
      body: data,
    });
    const end = performance.now();
    const duration = (end - start) / 1000;
    const bits = data.size * 8;
    const speedMbps = (bits / duration / 1024 / 1024).toFixed(2);

    uploadEl.textContent = `↑ Upload: ${speedMbps} Mbps`;
  } catch (e) {
    uploadEl.textContent = `↑ Upload: Failed`;
    console.error("Upload error:", e);
  }

  status.textContent = "Test completed.";
}
