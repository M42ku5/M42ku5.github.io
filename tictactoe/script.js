const elem = document.querySelectorAll(".row > div");
let moves = 0;
let winner = 0;

let arr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8"
];

elem[0].addEventListener("click", () => setMark(0));
elem[1].addEventListener("click", () => setMark(1));
elem[2].addEventListener("click", () => setMark(2));
elem[3].addEventListener("click", () => setMark(3));
elem[4].addEventListener("click", () => setMark(4));
elem[5].addEventListener("click", () => setMark(5));
elem[6].addEventListener("click", () => setMark(6));
elem[7].addEventListener("click", () => setMark(7));
elem[8].addEventListener("click", () => setMark(8));

document.querySelector(".grid-box").addEventListener("click", changeArea);

function changeArea() {
    document.querySelector(".description").innerHTML = "<button onclick='location.reload();'>reload</button>";
}

function setMark(position) {
    if (arr[position] != "" && winner === 0) {
    elem[position].innerHTML = "&times;";
    checkWinner();
    arr[position] = "";
    console.log(moves++);
    if (moves < 9 && winner === 0) {
    generatePositition();
}
}
}

function generatePositition() {
    
    let computer_mark = Math.floor(Math.random() * 9);
    
    checkNums(computer_mark);
}

function checkNums(input) {
        if (arr[input] === "") {
            generatePositition();
        } else {
    arr[input] = "";
    console.log(moves++);
    console.log(arr);
    elem[input].innerHTML = "&#9675;";
    elem[input].style.lineHeight = "95px";
    checkComputerWinner();
}
}

function checkWinner() {
    if ((elem[0].innerHTML === "×") && (elem[1].innerHTML === "×") && (elem[2].innerHTML === "×")) {
        elem[0].style.backgroundColor = "#0f0";
        elem[1].style.backgroundColor = "#0f0";
        elem[2].style.backgroundColor = "#0f0";
        winner = 1;
    }
    else if ((elem[3].innerHTML === "×") && (elem[4].innerHTML === "×") && (elem[5].innerHTML === "×")) {
        elem[3].style.backgroundColor = "#0f0";
        elem[4].style.backgroundColor = "#0f0";
        elem[5].style.backgroundColor = "#0f0";
        winner = 1;
    }
    else if ((elem[6].innerHTML === "×") && (elem[7].innerHTML === "×") && (elem[8].innerHTML === "×")) {
        elem[6].style.backgroundColor = "#0f0";
        elem[7].style.backgroundColor = "#0f0";
        elem[8].style.backgroundColor = "#0f0";
        winner = 1;
    }
    else if ((elem[0].innerHTML === "×") && (elem[3].innerHTML === "×") && (elem[6].innerHTML === "×")) {
        elem[0].style.backgroundColor = "#0f0";
        elem[3].style.backgroundColor = "#0f0";
        elem[6].style.backgroundColor = "#0f0";
        winner = 1;
    }
    else if ((elem[1].innerHTML === "×") && (elem[4].innerHTML === "×") && (elem[7].innerHTML === "×")) {
        elem[1].style.backgroundColor = "#0f0";
        elem[4].style.backgroundColor = "#0f0";
        elem[7].style.backgroundColor = "#0f0";
        winner = 1;
    }
    else if ((elem[2].innerHTML === "×") && (elem[5].innerHTML === "×") && (elem[8].innerHTML === "×")) {
        elem[2].style.backgroundColor = "#0f0";
        elem[5].style.backgroundColor = "#0f0";
        elem[8].style.backgroundColor = "#0f0";
        winner = 1;
    }
    else if ((elem[0].innerHTML === "×") && (elem[4].innerHTML === "×") && (elem[8].innerHTML === "×")) {
        elem[0].style.backgroundColor = "#0f0";
        elem[4].style.backgroundColor = "#0f0";
        elem[8].style.backgroundColor = "#0f0";
        winner = 1;
    }
    else if ((elem[2].innerHTML === "×") && (elem[4].innerHTML === "×") && (elem[6].innerHTML === "×")) {
        elem[2].style.backgroundColor = "#0f0";
        elem[4].style.backgroundColor = "#0f0";
        elem[6].style.backgroundColor = "#0f0";
        winner = 1;
    }
}

function checkComputerWinner() {
    if ((elem[0].innerHTML === "○") && (elem[1].innerHTML === "○") && (elem[2].innerHTML === "○")) {
        elem[0].style.backgroundColor = "#f00";
        elem[1].style.backgroundColor = "#f00";
        elem[2].style.backgroundColor = "#f00";
        winner = 1;
    }
    else if ((elem[3].innerHTML === "○") && (elem[4].innerHTML === "○") && (elem[5].innerHTML === "○")) {
        elem[3].style.backgroundColor = "#f00";
        elem[4].style.backgroundColor = "#f00";
        elem[5].style.backgroundColor = "#f00";
        winner = 1;
    }
    else if ((elem[6].innerHTML === "○") && (elem[7].innerHTML === "○") && (elem[8].innerHTML === "○")) {
        elem[6].style.backgroundColor = "#f00";
        elem[7].style.backgroundColor = "#f00";
        elem[8].style.backgroundColor = "#f00";
        winner = 1;
    }
    else if ((elem[0].innerHTML === "○") && (elem[3].innerHTML === "○") && (elem[6].innerHTML === "○")) {
        elem[0].style.backgroundColor = "#f00";
        elem[3].style.backgroundColor = "#f00";
        elem[6].style.backgroundColor = "#f00";
        winner = 1;
    }
    else if ((elem[1].innerHTML === "○") && (elem[4].innerHTML === "○") && (elem[7].innerHTML === "○")) {
        elem[1].style.backgroundColor = "#f00";
        elem[4].style.backgroundColor = "#f00";
        elem[7].style.backgroundColor = "#f00";
        winner = 1;
    }
    else if ((elem[2].innerHTML === "○") && (elem[5].innerHTML === "○") && (elem[8].innerHTML === "○")) {
        elem[2].style.backgroundColor = "#f00";
        elem[5].style.backgroundColor = "#f00";
        elem[8].style.backgroundColor = "#f00";
        winner = 1;
    }
    else if ((elem[0].innerHTML === "○") && (elem[4].innerHTML === "○") && (elem[8].innerHTML === "○")) {
        elem[0].style.backgroundColor = "#f00";
        elem[4].style.backgroundColor = "#f00";
        elem[8].style.backgroundColor = "#f00";
        winner = 1;
    }
    else if ((elem[2].innerHTML === "○") && (elem[4].innerHTML === "○") && (elem[6].innerHTML === "○")) {
        elem[2].style.backgroundColor = "#f00";
        elem[4].style.backgroundColor = "#f00";
        elem[6].style.backgroundColor = "#f00";
        winner = 1;
    }
}

if (navigator.language && navigator.language === 'de-DE') {
    document.querySelector(".description").innerHTML = "Klicke auf ein freies Feld im Gitter, um das Spiel zu beginnen.<br>Das Spiel gewinnt, wer zuerst drei seiner Markierungen nebeneinander setzen kann (horizontal, vertikal oder diagonal).";
} else {    
    document.querySelector(".description").innerHTML = "Click on an empty field in the grid to start the game.<br>The game wins who can first set three of his marks next to each other (horizontally, vertically or diagonally).";
}
