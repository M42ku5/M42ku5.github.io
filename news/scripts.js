const proxy = 'https://corsproxyms.herokuapp.com/';
const addrArr = [
'https://www.freecodecamp.org/news/rss/',
'https://css-tricks.com/feed/',
'https://dev.to/rss',
'https://www.tagesschau.de/xml/rss2_https/',
'https://www.heise.de/rss/heise.rdf',
'https://news.ycombinator.com/rss',
'https://www.ksta.de/feed/index.rss',
'https://www.sportschau.de//sportschauindex100~_type-rss.feed',
'https://www.smashingmagazine.com/feed/',
'https://rss.golem.de/rss.php?feed=RSS2.0',
'https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html'
];

const btnArr = [
    'fcc',
    'css-tricks',
    'devto',
    'tagesschau',
    'heise',
    'hn',
    'ksta',
    'sportschau',
    'smashingmag',
    'golem',
    'bild'
    ];

    const addBtnTitles = (item, index) => {
    item.innerHTML = btnArr[index];
    item.classList.add(btnArr[index]);
    }

    document.querySelectorAll('.rss-btn').forEach(addBtnTitles);

function searchFeed(){
    let txtValue;
    const input = document.querySelector('.search');
    let filter = input.value.toUpperCase();
    const elems = document.querySelectorAll('main a');
    for (let i = 0; i < elems.length; i++) {
        txtValue = elems[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            elems[i].style.display = '';
        } else {
            elems[i].style.display = 'none';
        }
    }
}

function clearSearch() {
    document.querySelector('.search').value='';
    searchFeed();
};

function updateActive(elem) {
if (document.querySelector('button.active')) {
document.querySelector('button.active').classList.remove('active');
}
elem.classList.add('active');
}

function createLinkElem(e) {

    if (e.querySelector('link').innerHTML.includes('www.heise.de')) {
        
        let printString = '';

        printString = e.querySelector('link').innerHTML.split('?')[0] + '?view=print';

        document.querySelector('main')
        .innerHTML += '<a href="'
        + printString
        + '" target="_blank">'
        + e.querySelector('title').innerHTML
        .replace('<![CDATA[','')
        .replace(']]>','')
        .trim()
        + '</a>';

    } else if (e.querySelector('title').innerHTML != '' && e.querySelector('link')) {
document.querySelector('main')
.innerHTML += '<a href="'
+ e.querySelector('link').innerHTML
+ '" target="_blank">'
+ e.querySelector('title').innerHTML
.replace('<![CDATA[','')
.replace(']]>','')
.trim()
+ '</a>';
}
}

function fetchFunct(pr, arrPos) {

if(pr == proxy){
pr = proxy;
} else {
pr = '';
}

document.querySelector('main').innerHTML = 'loading...';

fetch(pr + addrArr[arrPos])
.then(x => x.text())
.then(y => {
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(y, 'text/xml');
document.querySelector('main').innerHTML = '';

if(xmlDoc.querySelector('item pubDate')) {
const pubDate = xmlDoc.querySelector('item pubDate');
document.querySelector('main').innerHTML += '<div class="search-wrapper"><input class="search" type="text" onkeyup="searchFeed()" placeholder="search"><button type="button" class="clear-btn" onclick="clearSearch()">&times;</button></div><div class="date">Last publishing date: '+pubDate.innerHTML+'</div>';

if(pubDate.innerHTML != localStorage.getItem(arrPos)) {
localStorage.setItem(arrPos, pubDate.innerHTML);
document.querySelector('.date').classList.add('new');
}
}

xmlDoc.querySelectorAll('item').forEach(createLinkElem);

});

}

function loadDoc(pr, arrPos) {

if(pr == proxy){
pr = proxy;
} else {
pr = '';
}

document.querySelector('main').innerHTML = 'loading...';
const xhttp = new XMLHttpRequest();
xhttp.onload = function() {createElems(this,arrPos);}
xhttp.open("GET", pr + addrArr[arrPos]);
xhttp.send();
}

function createElems(xml,arrPos) {
const xmlDoc = xml.responseXML;
document.querySelector('main').innerHTML = '';

if(xmlDoc.querySelector('item pubDate')) {
const pubDate = xmlDoc.querySelector('item pubDate');
document.querySelector('main').innerHTML += '<div class="search-wrapper"><input class="search" type="text" onkeyup="searchFeed()" placeholder="search"><button type="button" class="clear-btn" onclick="clearSearch()">&times;</button></div><div class="date">Last publishing date: '+pubDate.innerHTML+'</div>';

if(pubDate.innerHTML != localStorage.getItem(arrPos)) {
localStorage.setItem(arrPos, pubDate.innerHTML);
document.querySelector('.date').classList.add('new');
}
}

xmlDoc.querySelectorAll('item').forEach(createLinkElem);
}

document.querySelectorAll('.rss-btn').forEach(addBtnEventListeners);

const addHash = x => {
window.location.hash=x;
}

const updateTitle = x => {
document.querySelector('title').innerText=x;
}

function addBtnEventListeners(item, index) {

if (index == 3) {

item.addEventListener('click',function() {
fetchFunct('np', index);
updateActive(this);
addHash(index);
updateTitle(this.innerText);
})
} else if (index == 9) {
item.addEventListener('click',function() {
loadDoc(proxy, index);
updateActive(this);
addHash(index);
updateTitle(this.innerText);
})
} else {

item.addEventListener('click',function() {
fetchFunct(proxy, index);
updateActive(this);
addHash(index);
updateTitle(this.innerText);
})

}

}

document.querySelector('.fs').addEventListener('click',function() {
const elem = document.documentElement;
if (elem.requestFullscreen) {
elem.requestFullscreen();
} else if (elem.webkitRequestFullscreen) { /* Safari */
elem.webkitRequestFullscreen();
} else if (elem.msRequestFullscreen) { /* IE11 */
elem.msRequestFullscreen();
}
});

document.querySelector('.dm').addEventListener('click',function() {
document.body.classList.toggle('dark');
});

window.addEventListener('DOMContentLoaded', () => {
    if(window.location.hash) {
    const x = window.location.hash.replace('#','');
    document.querySelectorAll('.rss-btn')[x].click();
}
});