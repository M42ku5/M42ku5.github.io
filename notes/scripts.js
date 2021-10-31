window.addEventListener('DOMContentLoaded',()=>{

    document.querySelector('textarea').value=localStorage.getItem('notes');

    const placeholderText = 'Use this area to take your notes and store them in your browser. Closing this tab or your browser does not delete your data.';

    document.querySelector('textarea').setAttribute('placeholder',placeholderText);

});

document.querySelector('textarea').addEventListener('keyup',function(){
    
    localStorage.setItem('notes',this.value);

});
