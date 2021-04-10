const loadJoke = () => {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then((response) => response.json())
    .then((data) => {
      const part1 = data.setup;
      const part2 = data.punchline;
      const output1 = part1 + "<br>" + part2;
      const output2 = part1 + "\n" + part2;
      const elem = document.createElement("h1");
      elem.innerHTML = output1;
      document.body.prepend(elem);
      console.log(output2);

      const copyToClipboard = str => {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        console.log('copied: '+output2);
      };
      copyToClipboard(output2);

    });
}
document.addEventListener("DOMContentLoaded", function (event) {
  loadJoke();
});
document.body.addEventListener("click", () => {
  document.querySelector("h1").remove();
  loadJoke();
});
