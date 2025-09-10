const githubApi = "https://api.github.com/repos/dkicekeeper/lottie-files/contents/";
// Use explicit branch on jsDelivr to avoid redirects and ensure proper CORS/content-type
const cdnPrefix = "https://cdn.jsdelivr.net/gh/dkicekeeper/lottie-files@main/";

async function loadAnimations() {
  const res = await fetch(githubApi);
  const files = await res.json();
  return files
    .filter(f => f.name.endsWith(".json") || f.name.endsWith(".lottie"))
    .map(f => {
      const isLottie = f.name.toLowerCase().endsWith(".lottie");
      const baseUrl = cdnPrefix + encodeURIComponent(f.name);
      const srcUrl = isLottie ? `${baseUrl}?filename=${encodeURIComponent(f.name)}` : baseUrl;
      return {
        name: f.name.replace(/\.(json|lottie)$/i, ""),
        url: srcUrl,
        filename: f.name,
        ext: isLottie ? ".lottie" : ".json"
      };
    });
}

function renderAnimations(data) {
  const container = document.getElementById('catalog');
  data.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card';
    const isDotLottie = item.ext === ".lottie";
    card.innerHTML = `
      ${isDotLottie ? `
        <dotlottie-player
          src="${item.url}"
          background="transparent"
          speed="1"
          loop
          autoplay
          style="width: 100%; height: 300px;">
        </dotlottie-player>
      ` : `
        <lottie-player
          src="${item.url}"
          background="transparent"
          speed="1"
          loop
          autoplay
          style="width: 100%; height: 300px;">
        </lottie-player>
      `}
      <div class="title">${item.name}</div>
      <button class="download-button" onclick="downloadFile('${item.url}', '${item.filename}')">⬇ Скачать ${isDotLottie ? 'LOTTIE' : 'JSON'}</button>
    `;
    // Surface load errors in console for easier debugging
    const player = card.querySelector(isDotLottie ? 'dotlottie-player' : 'lottie-player');
    if (player) {
      player.addEventListener('error', (e) => {
        console.error('Animation load error:', item.filename, e);
      });
    }
    container.appendChild(card);
  });
}

function downloadFile(url, filename) {
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    })
    .catch(err => alert("Ошибка при скачивании файла 😢"));
}

window.addEventListener('DOMContentLoaded', async () => {
  const data = await loadAnimations();
  renderAnimations(data);
});
