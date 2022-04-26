const sourceUrl = "https://www.tagesschau.de/xml/rss2_https/";

function getTime(input) {
  const date = new Date(input);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
    })
}

function showData(data) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    let txt = '';
    document.querySelector('main').innerHTML = '';
    
    [...xmlDoc.querySelectorAll('item')].forEach(e => {
        txt += `<details><summary><span class="time">${getTime(e.querySelector('pubDate').innerHTML)}:</span> ${e.querySelector('title').innerHTML}</summary><p><a href="${e.querySelector('link').innerHTML}" target="_blank" rel="noreferrer">${e.querySelector('description').innerHTML}</a></p></details>`;
    });

}

function getExternalData(url) {
fetch(url)
  .then(response => response.text())
  .then(data => showData(data));
}

document.querySelector(".reload").addEventListener("click", function() {
    getExternalData(sourceUrl)
})

getExternalData(sourceUrl)
