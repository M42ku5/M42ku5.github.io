function loadJoke() {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then((response) => response.json())
    .then((data) => {
      const elem = document.createElement("h1");
      elem.innerHTML = data.setup + " " + data.punchline;
      document.body.prepend(elem);
    });
}
document.addEventListener("DOMContentLoaded", function (event) {
  loadJoke();
});
document.body.addEventListener("click", () => {
  document.querySelector("h1").remove();
  loadJoke();
});
