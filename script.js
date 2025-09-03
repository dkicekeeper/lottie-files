
const publicSpreadsheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvFYhvFjLPFVbVQzVEhLsWJ_JHkacNR54z6pRmLDZFlrW8sSt6dyAaW0-PulDkef3gAMGlEyFrb4p7/pub?output=tsv';

function init() {
  Tabletop.init({
    key: publicSpreadsheetURL,
    simpleSheet: true,
    callback: showAnimations
  });
}

function showAnimations(data) {
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

window.addEventListener('DOMContentLoaded', init);
