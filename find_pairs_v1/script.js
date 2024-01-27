// All EventListener
window.addEventListener("load", () => randomizeArr());
window.addEventListener("load", () => checkIfGermanBrowser());
document.getElementById("header").addEventListener("click", () => window.location.reload(true));
document.getElementById("reset").addEventListener("click", () => window.location.reload());
document.getElementById("btn-1").addEventListener("click", () => compareValues("btn-1"));
document.getElementById("btn-2").addEventListener("click", () => compareValues("btn-2"));
document.getElementById("btn-3").addEventListener("click", () => compareValues("btn-3"));
document.getElementById("btn-4").addEventListener("click", () => compareValues("btn-4"));
document.getElementById("btn-5").addEventListener("click", () => compareValues("btn-5"));
document.getElementById("btn-6").addEventListener("click", () => compareValues("btn-6"));
document.getElementById("btn-7").addEventListener("click", () => compareValues("btn-7"));
document.getElementById("btn-8").addEventListener("click", () => compareValues("btn-8"));
document.getElementById("btn-9").addEventListener("click", () => compareValues("btn-9"));
document.getElementById("btn-10").addEventListener("click", () => compareValues("btn-10"));
document.getElementById("btn-11").addEventListener("click", () => compareValues("btn-11"));
document.getElementById("btn-12").addEventListener("click", () => compareValues("btn-12"));
document.getElementById("btn-13").addEventListener("click", () => compareValues("btn-13"));
document.getElementById("btn-14").addEventListener("click", () => compareValues("btn-14"));
document.getElementById("btn-15").addEventListener("click", () => compareValues("btn-15"));
document.getElementById("btn-16").addEventListener("click", () => compareValues("btn-16"));
document.getElementById("btn-17").addEventListener("click", () => compareValues("btn-17"));
document.getElementById("btn-18").addEventListener("click", () => compareValues("btn-18"));
document.getElementById("btn-19").addEventListener("click", () => compareValues("btn-19"));
document.getElementById("btn-20").addEventListener("click", () => compareValues("btn-20"));
document.getElementById("wrapper").addEventListener("click", showTime);

let valA = "";
let idA = "";
let valB = "";
let views = 0;
let pairs = 0;
let time = 0;

function showTime() {

if (time === 0) {
    removeHandler();
}

if (time < 60) {
    document.getElementById("time").style.color = "#5d5";
} else {
    document.getElementById("time").style.color = "red";
}

if (pairs < 10) {
document.getElementById("time").innerHTML = ++time;
setTimeout(() => showTime(), 1000);
}
}

function removeHandler() {
    document.getElementById("wrapper").removeEventListener("click", showTime);
  }

let compareValues = (valId) => {
    document.getElementById("views").innerHTML = ++views;

    if (views >= 20 && views <= 40) {
        document.getElementById("views").style.color = "#5d5";
    } else if (views > 40) {
        document.getElementById("views").style.color = "red";
    }

    if (pairs < 10 && views > 20) {
        document.getElementById("pairs").style.color = "red";
    }

    if (valA === "") { // if the first card was not selected yet
    valA = document.getElementById(valId).value; // valA gets assigned the value of card A
    idA = valId; // the id of card a is saved for a comparison when card b is selected
    document.getElementById(idA).innerHTML = ""; // card A becomes visible
    document.getElementById(idA).disabled = true; // card A becomes disabled to prevent comparison with itself
    // console.log("valA: " + valA);
} else {
    valB = document.getElementById(valId).value; // when card B is selected its value is assigned to valB
    // console.log("valB: " + valB);

    if (valA === valB) {
        document.getElementById("pairs").innerHTML = ++pairs;

        if (pairs === 10) {
            document.getElementById("pairs").style.color = "#5d5";
            let efficiency = Math.round(20 / views * 100);
            document.getElementById("efficiency").style.display = "inline-block";
            document.getElementById("efficiency-result").innerHTML = efficiency;
            if (efficiency < 50) {
                document.getElementById("efficiency-result").style.color = "red";
            } else {
                document.getElementById("efficiency-result").style.color = "#5d5";
            }
        }

        document.getElementById(valId).innerHTML = ""; // card B becomes visible
        document.getElementById(valId).disabled = true; // card B becomes disabled
        setTimeout(() => {
            document.getElementById(idA).style.backgroundImage = "none";
            document.getElementById(idA).style.boxShadow = "none";
            document.getElementById(valId).style.backgroundImage = "none";
            document.getElementById(valId).style.boxShadow = "none";
            valA = "";
            valB = "";
            idA = "";
            }, 200);
    } else {
        document.getElementById(valId).innerHTML = ""; // card B becomes visible
        setTimeout(() => {
            document.getElementById(valId).innerHTML = "<img src='img/standard.jpg' alt='img'>"; // card B becomes not visible anymore
            document.getElementById(idA).innerHTML = "<img src='img/standard.jpg' alt='img'>"; // // card A becomes not visible anymore
            document.getElementById(idA).disabled = false; // card A becomes enabled again
            valA = "";
            valB = "";
            idA = "";
            }, 500);
    }

}
}

let arr1 = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
let arr2 = [];

let randomizeArr = () => {
for (let i = 0; i < arr1.length; i++) {
  let index = Math.floor(Math.random() * arr1.length);
  if (arr1[index] != "") {
  arr2.push(arr1[index]);
  arr1[index] = "";
  }
}
  if (arr1.length != arr2.length) {
  randomizeArr();
  } else {
      writeValues();
  }
}

let writeValues = () => {
    for (let i = 0; i < arr2.length; i++) {
        document.getElementById('btn-' + (i + 1)).value = arr2[i];
      }
}

// check if the browser language is German
let checkIfGermanBrowser = () => {
    if (navigator.language === "de-DE") {
        document.getElementById("title").innerHTML = "Finde die Bild-Paare! (von Markus Schmieder)";
        document.getElementById("header").innerHTML = "Finde die Paare!";
        document.getElementById("reset").innerHTML = "zurücksetzen 🔄🎲";
        document.getElementById("views-txt").innerHTML = "Aufdeckungen:";
        document.getElementById("pairs-txt").innerHTML = "Paare:";
        document.getElementById("efficiency-txt").innerHTML = "Effizienz:";
    } else {
        document.getElementById("title").innerHTML = "Find the picture pairs! (by Markus Schmieder)";
        document.getElementById("header").innerHTML = "Find the pairs!";
        document.getElementById("reset").innerHTML = "reset 🔄🎲";
        document.getElementById("views-txt").innerHTML = "Views:";
        document.getElementById("pairs-txt").innerHTML = "Pairs:";
        document.getElementById("efficiency-txt").innerHTML = "Efficiency:";
    }
}