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
let description = xmlDoc.querySelectorAll('description');
let url = xmlDoc.querySelectorAll('enclosure[url]');
for(let i = 0; i < 1; i++){
txt = txt + '<li> <a href="' + url[i].getAttribute('url') + '" target="_blank">' + description[i+1].innerHTML + '</a> <span class="note">(normale Geschw.)</span><div class="controls"><button onclick="playAudio(this)"><div class="font-size-14 padding-top-1">&#9654;</div><div class="font-size-9 letter-spacing-0">&#10073;&#10073;</div></button><audio><source src="'+ url[i].getAttribute('url') +'" type="audio/mpeg"> Your browser does not support the audio element.</audio><span class="time"></span> <span class="note">(2-fache Geschw.)</span></div></li>';
}
output.innerHTML = '<ul>' + txt + '</ul>';
const audioHook = document.querySelectorAll('audio');
function setPlaySpeed(){
for(let i = 0; i < audioHook.length; i++){
audioHook[i].defaultPlaybackRate = 2.0;
audioHook[i].load();
}
}
setPlaySpeed();

const playTimeHook = document.querySelectorAll('.time');

function showPlayTime(){
for(let i = 0; i < audioHook.length; i++){
audioHook[i].addEventListener(
"timeupdate",() =>{
let cTime = audioHook[i].currentTime;
let zero = '';
if(Math.floor(cTime) % 60 < 10){
zero = 0;
};
playTimeHook[i].innerHTML =( Math.floor(Math.floor(cTime) / 60) ) + ':' + zero +(Math.floor(cTime) % 60);

}
);
}
}
showPlayTime();

}else if(this.status > 200){
output.innerHTML = 'Status: ' + this.status;
}
};
let corsProxy = 'https://corsproxyms.herokuapp.com/';
xhr.open('GET', corsProxy + NewsUrl, true);
xhr.send();
}
