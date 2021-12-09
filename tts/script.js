let langChoice = '';

function langSelect(x) {
    langChoice = x.value;
}

document.querySelectorAll('input[type=radio]').forEach(e=>{
    if(e.checked) {
        langChoice = e.value;
    }
});

function speak(){
    if(document.querySelector('.tts-input').value){
        const msg = new SpeechSynthesisUtterance;
        msg.text = document.querySelector('.tts-input').value;
        msg.lang = langChoice;
        msg.rate = document.querySelector('.rate').value;
        speechSynthesis.speak(msg);
    }else{
        alert('Please enter text first.');
    }
}

function showVal(){
    document.querySelector('.rate-value').innerHTML = document.querySelector('.rate').value;
}
showVal();

document.querySelector('.btn-stop').addEventListener('click', () => speechSynthesis.cancel());

document.querySelectorAll('input[type=radio]').forEach(e=>e.addEventListener('click',function(){langSelect(this)}));
