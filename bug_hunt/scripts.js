window.addEventListener('load', callPlacingFuncts);
window.addEventListener('load', changeBgImg);
document.getElementById('minuslayer').addEventListener('click', subtractAndShowCounter);
document.getElementById('closefullscreen').addEventListener('click', closeFullscreen);
document.getElementById('bug1').addEventListener('click', createStain1);
document.getElementById('bug1').addEventListener('click', changeObj1);
document.getElementById('bug1').addEventListener('click', changePositionOfBug1);
document.getElementById('bug1').addEventListener('click', addPointForBugHit);
document.getElementById('bug2').addEventListener('click', createStain2);
document.getElementById('bug2').addEventListener('click', subtractTwoPointsForBugHit);
document.getElementById('bug2').addEventListener('click', changeObj2);
document.getElementById('bug2').addEventListener('click', changePositionOfBug2);

document.getElementById('btn-easy').addEventListener('click', makeEasy);
document.getElementById('btn-normal').addEventListener('click', makeNormal);
document.getElementById('btn-start').addEventListener('click', countDown);
document.getElementById('btn-start').addEventListener('click', hideStartScreen);
document.getElementById('btn-start').addEventListener('click', openFullscreen);
document.getElementById('btn-start').addEventListener('click', animateCloseBtn);

document.getElementById('btn-restart').addEventListener('click', function(){location.reload()});

var flag = true;
var timer = 30;
var posChangeTime = 1500;
var totalPointsCounter = 0;
var bugHitsCounter = 0;
var distLeft1;
var distTop1;
var distLeft2;
var distTop2;

function changeTimeStripeLength() {
  var timestripelength = timer * (100 / 30);
  document.getElementById('timestripe').style.width = timestripelength + 'vw'; 
}

function showHitpoints(pts) {
  var x = document.getElementById('pointsalert');
  x.style.display = 'block';
  x.innerHTML = pts;
  setTimeout(function(){x.style.display = 'none'}, 300);
}

function randomizeColor() {
  var arrayCol = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f'
  ];

  var a = Math.floor((Math.random() * 16));
  var b = Math.floor((Math.random() * 16));
  var c = Math.floor((Math.random() * 16));
  var d = Math.floor((Math.random() * 16));
  var e = Math.floor((Math.random() * 16));
  var f = Math.floor((Math.random() * 16));

  document.getElementById('timestripe').style.backgroundColor = '#' + arrayCol[a] + arrayCol[b] + arrayCol[c] + arrayCol[d] + arrayCol[e] + arrayCol[f];
}

function countDown() {
  if (timer >= 0) {
  document.getElementById('countdown').innerHTML = timer + 's';
  timer--;
  changeTimeStripeLength();
  randomizeColor();
  setTimeout(countDown, 1000);
  };
}

function stop(){
  flag = false;
}

function callPlacingFuncts() {
  if (flag){
  changePositionOfBug1();
  changePositionOfBug2();
  changeObj1();
  changeObj2();
  setTimeout(callPlacingFuncts, posChangeTime);
  }
}

function changeBgImg() {
  var x = Math.floor(Math.random() * 8);
  document.getElementById('all').style.backgroundImage = 'url("img/bg/' + x + '.jpg")';
}

function changeObj1() {
  var x = Math.floor(Math.random() * 12);
  var badinsect = document.getElementById('bug1');
  badinsect.style.backgroundImage = 'url("img/badbugs/' + x + '.png")';
}

function changeObj2() {
  var x = Math.floor(Math.random() * 4);
  var goodinsect = document.getElementById('bug2');
  goodinsect.style.backgroundImage = 'url("img/goodbug/' + x + '.png")';
}

function hideStartScreen() {
  document.getElementById('startscreen').style.display = 'none';

    /* Diese Funktion bestimmt, was nach einer Runde von 30 Sekunden passiert */
    setTimeout(function(){
        stop();
        showFinalScore();
        storeFlyHits();
        changeEndImg();
        document.getElementById('finalscreen').style.display = 'block';
        showTotalFlyHits();
        trefferquote()
    }, 30000); /* Eine Spielrunde dauert 30 Sekunden */
}

function openFullscreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
  elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
  elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
  elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
  elem.msRequestFullscreen();
  }
}

function animateCloseBtn() {
  var x = document.getElementById('closefullscreen');
  x.style.animationName = 'fadeout';
  setTimeout(function(){x.style.display = 'none';}, 8000);
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
  var x = document.getElementById('closefullscreen'); 
  x.style.display = 'none';
}

function changePositionOfBug1() {
  distLeft1 = Math.floor(Math.random() * 81);
  distTop1 = Math.floor(Math.random() * 81);
  document.getElementById('bug1').style.left = distLeft1  + '%';
  document.getElementById('bug1').style.top = distTop1 + '%';
}

function changePositionOfBug2() {
  distLeft2 = Math.floor(Math.random() * 81);
  distTop2 = Math.floor(Math.random() * 81);
  document.getElementById('bug2').style.left = distLeft2  + '%';
  document.getElementById('bug2').style.top = distTop2 + '%';
}

function createStain1() {
  var remain = document.createElement('DIV');
  remain.classList.add('stain1');
  remain.style.left = distLeft1  + '%';
  remain.style.top = distTop1 + '%';
  document.getElementById('all').appendChild(remain);
  showHitpoints('+1');
  document.getElementById('pointsalert').style.color = '#afa';
}

function addPointForBugHit() {
  bugHitsCounter++;
  document.getElementById('counter').innerHTML = ++totalPointsCounter;
}

function createStain2() {
  var remain = document.createElement('DIV');
  remain.classList.add('stain2');
  remain.style.left = distLeft2  + '%';
  remain.style.top = distTop2 + '%';
  document.getElementById('all').appendChild(remain);
  showHitpoints('-2');
  document.getElementById('pointsalert').style.color = '#faa';
}

function subtractTwoPointsForBugHit() {
  totalPointsCounter = totalPointsCounter - 2;
  document.getElementById('counter').innerHTML = totalPointsCounter;
}

function storeFlyHits() {
  if (localStorage.totalbugs) {
    localStorage.totalbugs = Number(localStorage.totalbugs) + bugHitsCounter;
  } else {
    localStorage.totalbugs = bugHitsCounter;
  }
}

function showTotalFlyHits() {
  document.getElementById('result').innerHTML = bugHitsCounter + ' (' + localStorage.totalbugs + ' in all games)';
}

function subtractAndShowCounter() {
  document.getElementById('counter').innerHTML = --totalPointsCounter;

  showHitpoints('-1');
  document.getElementById('pointsalert').style.color = '#faa';
}

function showFinalScore() {
  document.getElementById('finalscore').innerHTML = totalPointsCounter;
}

function trefferquote() {
  var trefferquote = (totalPointsCounter / bugHitsCounter) * 100;
  if (trefferquote > 0) {
  document.getElementById('trefferquote').innerHTML = parseInt(trefferquote) + '%';
  } else {
    document.getElementById('trefferquote').innerHTML = '0%';
  }
}

function changeEndImg() {
  if (totalPointsCounter <= 0) {
    document.getElementById('endimg').src = 'img/blind.png';
    document.getElementById('endtext').innerHTML = 'Almost!';
    document.getElementById('motivation').innerHTML = 'You will get better!';
  }
}

function makeEasy() {
  document.getElementById('bug2').style.display = 'none';
  document.getElementById('btn-easy').innerHTML = 'easy activated';
  document.getElementById('btn-normal').innerHTML = 'normal';
  document.getElementById('btn-easy').style.color = '#0f0';
  document.getElementById('btn-normal').style.color = '#fff';
  posChangeTime = 4000;
}

function makeNormal() {
  document.getElementById('bug2').style.display = 'block';
  document.getElementById('btn-easy').innerHTML = 'easy';
  document.getElementById('btn-normal').innerHTML = 'normal activated';
  document.getElementById('btn-normal').style.color = '#0f0';
  document.getElementById('btn-easy').style.color = '#fff';
  posChangeTime = 1500;
}
