var audio = new Audio('./28.mp3');
var h1 = document.querySelector('h1');

document.body.addEventListener('keydown', function(val) {
    if(val.key === 'a'){
for(let i=0; i<10; i++){
    audio.play();
    
}
    }
});