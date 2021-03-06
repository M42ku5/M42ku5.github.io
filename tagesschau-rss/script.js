fetch('https://www.tagesschau.de/xml/rss2_https/')
.then(x => x.text())
.then(y => {
let parser = new DOMParser();
let xmlDoc = parser.parseFromString(y,"text/xml");
let txt = '';
[...xmlDoc.querySelectorAll('item')].slice(0, 10).forEach(e=>{
txt += '<details><summary>' + e.querySelector('title').innerHTML + '</summary><p><a href="' + e.querySelector('link').innerHTML + '" target="_blank" rel="noreferrer">' + e.querySelector('description').innerHTML + '</a></p></details>';
});
document.querySelector('main').innerHTML = txt + '<p class="more">mehr anzeigen</p>';
document.querySelector('.more').addEventListener('click',function(){
document.querySelectorAll('details').forEach(e=>e.remove());
(this).remove();

xmlDoc.querySelectorAll('item').forEach(e=>{
document.querySelector('main').innerHTML += '<details><summary>' + e.querySelector('title').innerHTML + '</summary><p><a href="' + e.querySelector('link').innerHTML + '" target="_blank" rel="noreferrer">' + e.querySelector('description').innerHTML + '</a></p></details>';
});

});
});
