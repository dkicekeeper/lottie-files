const githubApi = "https://api.github.com/repos/dkicekeeper/lottie-files/contents/";
const rawPrefix = "https://raw.githubusercontent.com/dkicekeeper/lottie-files/main/";

async function loadAnimations() {
  const res = await fetch(githubApi);
  const files = await res.json();
  return files
    .filter(f => f.name.endsWith(".lottie"))
    .map(f => ({
      name: f.name.replace(".lottie", ""),
      url: rawPrefix + f.name
    }));
}

function renderAnimations(data) {
  const container = document.getElementById('catalog');
  data.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <lottie-player
        src="${item.url}"
        background="transparent"
        speed="1"
        loop
        hover
        autoplay
        style="width: 100%; height: 300px;">
      </lottie-player>
      <div class="title">${item.name}</div>
    `;
    container.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  const data = await loadAnimations();
  renderAnimations(data);
});
