const githubApi = "https://api.github.com/repos/dkicekeeper/lottie-files/contents/";
const cdnPrefix = "https://cdn.jsdelivr.net/gh/dkicekeeper/lottie-files/";

async function loadAnimations() {
  const res = await fetch(githubApi);
  const files = await res.json();
  return files
    .filter(f => f.name.endsWith(".lottie"))
    .map(f => ({
      name: f.name.replace(".lottie", ""),
      url: cdnPrefix + encodeURIComponent(f.name),
      filename: f.name
    }));
}

function renderAnimations(data) {
  const container = document.getElementById('catalog');
  data.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <dotlottie-player
        src="${item.url}"
        background="transparent"
        speed="1"
        loop
        autoplay
        style="width: 100%; height: 300px;">
      </dotlottie-player>
      <div class="title">${item.name}</div>
      <button class="download-button" onclick="downloadLottie('${item.url}', '${item.filename}')">⬇ Скачать .lottie</button>
    `;
    container.appendChild(card);
  });
}

function downloadLottie(url, filename) {
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
