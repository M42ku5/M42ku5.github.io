fetch("https://www.tagesschau.de/export/podcast/hi/tagesschau-in-100-sekunden/")
  .then((res) => res.text())
  .then((data) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');
    const audioUrl = xmlDoc.querySelector('enclosure').getAttribute('url');
    const pubDate = xmlDoc.querySelector("item pubDate").innerHTML;
    const dateObj = new Date(pubDate);

    const currentHours = dateObj.getHours();
    const currentMinutes = dateObj.getMinutes();
    const formatHours =  currentHours > 10 ? currentHours : '0' + currentHours;
    const formatMinutes = currentMinutes > 10 ? currentMinutes : '0' + currentMinutes;
    const pubTime = formatHours + ":" + formatMinutes;

    document.querySelector('section').innerHTML =
      `<p>Beitrag von: ${pubTime} Uhr</p>
      <audio controls>
      <source src="${audioUrl}" type="audio/mpeg">Your browser does not support the audio tag.
      </audio>
      <p>Geschwindigkeit:<br>
      <button class="speed-btn1">1x</button> <button class="speed-btn2">2x</button> <button class="speed-btn3">2.5x</button>
      </p>
      <p><label>
      <input type="checkbox" checked> Intro überspringen</label></p>
      <p><a href="${audioUrl}">Quelle</a></p>`;

      function skipIntro(x) {
        if(!document.querySelector('audio').paused){
          document.querySelector('audio').pause();
        }
        if(x.checked){
          document.querySelector('audio').currentTime = 10;
        } else {
          document.querySelector('audio').currentTime = 0;
        }
      }

    document.querySelector('audio').playbackRate = 2;
    document.querySelector('.speed-btn1').addEventListener('click',() => document.querySelector('audio').playbackRate = 1);
    document.querySelector('.speed-btn2').addEventListener('click',() => document.querySelector('audio').playbackRate = 2);
    document.querySelector('.speed-btn3').addEventListener('click',() => document.querySelector('audio').playbackRate = 2.5);
    document.querySelector('input[type=checkbox]').addEventListener('change',function(){skipIntro(this)});
    document.querySelector('audio').currentTime = 10;
  });
