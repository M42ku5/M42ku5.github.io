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

document.querySelector('.tts-input').addEventListener('keyup',function(){
    updateLengthValue();
    lengthElemHider();
}
)

function lengthElemHider() {
if(document.querySelector('.tts-input').value.length > 3999){
    if(document.querySelector('.shorten-warpper').classList.contains('hidden')) {
        document.querySelector('.shorten-warpper').classList.remove('hidden');
    }
} else {
    if(!document.querySelector('.shorten-warpper').classList.contains('hidden')) {
        document.querySelector('.shorten-warpper').classList.add('hidden');
    }
}
}

document.querySelector('.shorten').addEventListener('click',function(){
    document.querySelector('textarea').value = document.querySelector('textarea').value.slice(0,3999);
    updateLengthValue();
    lengthElemHider();
}
)

function updateLengthValue(){
document.querySelector('.input-text-length').innerHTML = document.querySelector('.tts-input').value.length;
}
updateLengthValue();
