
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSFLGLmPWBE5wyGkDp49_K6eqZekLeOzPvXwjJS7BYvxrUkxRmu2Wn4LN8t6pKggz3BptK-R1av6xh6/pub?output=tsv';

async function loadTSVData() {
  const res = await fetch(sheetUrl);
  const tsv = await res.text();
  const lines = tsv.trim().split('\n');
  const headers = lines[0].split('\t');
  const rows = lines.slice(1).map(line => {
    const values = line.split('\t');
    return headers.reduce((obj, header, i) => {
      obj[header.trim()] = values[i] || '';
      return obj;
    }, {});
  });
  return rows;
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
  const data = await loadTSVData();
  renderAnimations(data);
});
