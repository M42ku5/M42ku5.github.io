const sourceUrl = "https://www.tagesschau.de/xml/rss2_https/"
function getTime(input) { const date = new Date(input); return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) }
const showTime = (condition, result) => {
  if (condition === 0){
    return `<span class="time">${result}</span> `
  } else {
    return ""
  }
}
function showData(data) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(data, "text/xml")
  let txt = ""
  xmlDoc.querySelectorAll('item').forEach((e,i) => {
    txt += `<details><summary onclick="if(!this.parentElement.querySelector('p')){const para=document.createElement('p');this.parentElement.appendChild(para);const el=document.createElement('a');el.setAttribute('href','${e.querySelector('link').innerHTML}');el.setAttribute('target','_blank');el.setAttribute('rel','noreferrer');el.innerHTML='${e.querySelector('title').innerHTML.replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")}: ${e.querySelector('description').innerHTML.replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")}';para.appendChild(el)}">${showTime(i,getTime(e.querySelector('pubDate').innerHTML))}${e.querySelector('title').innerHTML}</summary></details>`
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
document.querySelector(".reload").addEventListener("click", function () { getExternalData(sourceUrl) })
getExternalData(sourceUrl)
