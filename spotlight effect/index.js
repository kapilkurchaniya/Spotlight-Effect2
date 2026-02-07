var box = document.querySelector('.box');
    let video = document.querySelector("video")

document.addEventListener('mousemove', function(e){
    let x = e.clientX;
    let y = e.clientY;
    box.style.setProperty('--x', x + 'px');
    box.style.setProperty('--y', y + 'px');
});
document.addEventListener('click', function(){

video.play();

});