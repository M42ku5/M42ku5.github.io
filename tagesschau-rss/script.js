const sourceUrl = "https://www.tagesschau.de/xml/rss2_https/"
function getTime(input) { const date = new Date(input); return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) }
function showData(data) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(data, "text/xml")
  console.log(xmlDoc)
  let txt = ""
  xmlDoc.querySelectorAll('item').forEach(e => {
    txt += `<details><summary onclick="if(!this.parentElement.querySelector('p')){const para=document.createElement('p');this.parentElement.appendChild(para);const el=document.createElement('a');el.setAttribute('href','${e.querySelector('link').innerHTML}');el.setAttribute('target','_blank');el.setAttribute('rel','noreferrer');el.innerHTML='${e.querySelector('description').innerHTML}';para.appendChild(el)}"><span class="time">${getTime(e.querySelector('pubDate').innerHTML)}</span> ${e.querySelector('title').innerHTML}</summary></details>`
  })
  document.querySelector('main').innerHTML = ""
  document.querySelector('main').innerHTML = txt
  document.querySelectorAll("summary").forEach(el => {
    el.addEventListener("click", function (ev) {
      ev.preventDefault()
      import("/tagesschau-rss/toggle.js")
        .then(module => module.toggle(this))
        .catch(err => {
          console.log(`error: ${err.message}`);
        });
    })
  })
}
function getExternalData(url) { fetch(url).then(response => response.text()).then(data => showData(data)) }
document.querySelector(".logo").addEventListener("click", function () { getExternalData(sourceUrl) })
document.querySelector(".menu").addEventListener("click", function () { getExternalData(sourceUrl) })
getExternalData(sourceUrl)
