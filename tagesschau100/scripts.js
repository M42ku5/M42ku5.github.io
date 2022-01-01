fetch("https://www.tagesschau.de/export/podcast/hi/tagesschau-in-100-sekunden/")
.then((res)=>res.text())
.then((data)=>{
const parser=new DOMParser();
const xmlDoc=parser.parseFromString(data, 'text/xml');
const audioUrl=xmlDoc.querySelector('enclosure').getAttribute('url');
const pubDate=xmlDoc.querySelector("item pubDate").innerHTML;
const dateObj=new Date(pubDate);
const currentHours=dateObj.getHours();
const currentMinutes=dateObj.getMinutes();
const formatHours=currentHours >= 10 ? currentHours : '0' + currentHours;
const formatMinutes=currentMinutes >= 10 ? currentMinutes : '0' + currentMinutes;
const pubTime=formatHours + ":" + formatMinutes;
document.querySelector('section').innerHTML=
`<p>Beitrag von: ${pubTime} Uhr</p>
<audio controls>
<source src="${audioUrl}" type="audio/mpeg">Your browser does not support the audio tag.
</audio>
<p><label for="speed">Geschwindigkeit:</label><br>
<div class="speed-wrapper">
<input type="range" class="speed" id="speed" value="2.2" min="1" max="3.5" step="0.1"> <span class="speed-status"></span>
</div>
</p>
<p><label>
<input type="checkbox" checked> Intro überspringen</label></p>
<p><a href="${audioUrl}">Quelle</a></p>`;
function skipIntro(x){
if(!document.querySelector('audio').paused){
document.querySelector('audio').pause();
}
if(x.checked){
document.querySelector('audio').currentTime=13;
}else{
document.querySelector('audio').currentTime=0;
}
}
function updateSpeedStatus(){
document.querySelector('.speed-status').innerHTML=document.querySelector('.speed').value;
}
document.querySelector('audio').playbackRate=document.querySelector('.speed').value;
document.querySelector('.speed').addEventListener('change',()=>{
document.querySelector('audio').playbackRate=document.querySelector('.speed').value;
updateSpeedStatus();
});
document.querySelector('input[type=checkbox]').addEventListener('change',function(){skipIntro(this)});
document.querySelector('audio').currentTime=13;
updateSpeedStatus();
});
