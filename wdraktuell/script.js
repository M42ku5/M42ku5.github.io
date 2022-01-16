function playAudio(el){
if(!el.nextSibling.paused){
el.nextSibling.pause();
}else{
el.nextSibling.play();
}
}
window.addEventListener('load',() => loadSource('https://www1.wdr.de/mediathek/audio/wdr-aktuell-news/wdr-aktuell-152.podcast'));
let loadSource =(NewsUrl) =>{
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
let output = document.querySelector('.output');
if(this.readyState == 4 && this.status == 200){
let xmlDoc = this.responseXML;
let txt = '';
let description = xmlDoc.querySelector('description');
let url = xmlDoc.querySelector('enclosure[url]');

txt = `${txt}<li> <a href="${url.getAttribute('url')}" target="_blank">${description.innerHTML}</a> <span class="note">(normale Geschw.)</span><div class="controls"><button onclick="playAudio(this)"><div class="font-size-14 padding-top-1">&#9654;</div><div class="font-size-9 letter-spacing-0">&#10073;&#10073;</div></button><audio><source src="${url.getAttribute('url')}" type="audio/mpeg"> Your browser does not support the audio element.</audio><span class="time"></span><button onclick="setPlaySpeed(1)">1x</button><button onclick="setPlaySpeed(1.5)">1.5x</button><button onclick="setPlaySpeed(2)">2x</button></div></li>`;

output.innerHTML = `<ul>${txt}</ul>`;
const audioHook = document.querySelector('audio');
function setPlaySpeed(x){
audioHook.defaultPlaybackRate=x;
audioHook.load();
}
const playTimeHook = document.querySelector('.time');
function showPlayTime(){
audioHook.addEventListener(
"timeupdate",()=>{
let cTime = audioHook.currentTime;
let zero = '';
if(Math.floor(cTime) % 60 < 10){
zero = 0;
}
playTimeHook.innerHTML=(Math.floor(Math.floor(cTime) / 60)) + ':' + zero +(Math.floor(cTime) % 60);
}
);
}
showPlayTime();
}else if(this.status > 200){
output.innerHTML = `Status: ${this.status}`;
}
};
let corsProxy = 'https://corsproxyms.herokuapp.com/';
xhr.open('GET', corsProxy + NewsUrl, true);
xhr.send();
}
