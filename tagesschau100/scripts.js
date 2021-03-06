fetch("https://www.tagesschau.de/export/podcast/hi/tagesschau-in-100-sekunden/")
  .then((res) => res.text())
  .then((data) => {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(data, "text/xml");
    let audioUrl = xmlDoc
      .getElementsByTagName("enclosure")[0]
      .getAttribute("url");
    // console.log(audioUrl);
    let pubDate = xmlDoc.querySelector("item pubDate").innerHTML;
    // console.log(pubDate);
    let dateObj = new Date(pubDate);
    
    let currentHours = dateObj.getHours();
    let currentMinutes = dateObj.getMinutes();
    let formatHours =  currentHours > 10 ? currentHours : '0' + currentHours;
    let formatMinutes = currentMinutes > 10 ? currentMinutes : '0' + currentMinutes;
    let pubTime = formatHours + ":" + formatMinutes;

    // console.log(pubTime);
    document.getElementsByTagName("section")[0].innerHTML =
      '<p>Beitrag von: ' +
      pubTime +
      ' Uhr</p><audio controls><source src="' +
      audioUrl +
      '" type="audio/mpeg">Your browser does not support the audio tag.</audio><p>Geschwindigkeit:<br><button class="speed-btn1">1x</button> <button class="speed-btn2">2x</button></p><p><a href="' +
      audioUrl +
      '">Quelle</a></p>';
    document.getElementsByTagName("audio")[0].playbackRate = "2";
    document
      .getElementsByClassName("speed-btn1")[0]
      .addEventListener(
        "click",
        () => (document.getElementsByTagName("audio")[0].playbackRate = "1")
      );
    document
      .getElementsByClassName("speed-btn2")[0]
      .addEventListener(
        "click",
        () => (document.getElementsByTagName("audio")[0].playbackRate = "2")
      );
  });
