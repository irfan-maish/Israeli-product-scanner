// Simulated known Israeli barcode prefixes and URLs
const israeliPrefixes = ["729"];
const israeliDomains = ["co.il", "il", "israel"];

function checkIfIsraeli(data) {
  // Check if it's a barcode
  if (data.match(/^\d{13}$/)) {
    const prefix = data.slice(0, 3);
    return israeliPrefixes.includes(prefix);
  }

  // Check if it's a URL
  try {
    const url = new URL(data);
    return israeliDomains.some(domain => url.hostname.includes(domain));
  } catch (e) {
    return false;
  }
}

let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

scanner.addListener('scan', function (content) {
  let resultElement = document.getElementById('result');
  if (checkIfIsraeli(content)) {
    resultElement.innerHTML = "🚫 Israeli Product Detected";
    resultElement.style.color = "red";
  } else {
    resultElement.innerHTML = "✅ Not an Israeli Product";
    resultElement.style.color = "lightgreen";
  }
});

Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
    scanner.start(cameras[0]);
  } else {
    alert('No cameras found.');
  }
}).catch(function (e) {
  console.error(e);
});
