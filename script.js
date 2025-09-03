const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvFYhvFjLPFVbVQzVEhLsWJ_JHkacNR54z6pRmLDZFlrW8sSt6dyAaW0-PulDkef3gAMGlEyFrb4p7/pub?output=tsv';

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
  data.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.thumbnail}" class="preview" alt="preview">
      <div class="lottie-player" id="lottie-${index}"></div>
      <div class="title">${item.name}</div>
    `;
    container.appendChild(card);

    lottie.loadAnimation({
      container: document.getElementById(`lottie-${index}`),
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: item.url
    });
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  const data = await loadTSVData();
  renderAnimations(data);
});
