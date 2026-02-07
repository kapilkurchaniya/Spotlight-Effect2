var inc= document.querySelector("#incrementBtn");
var dec = document.querySelector("#decrementBtn");
var audio = new Audio("28.mp3");
var count = 0;
var maala=0;
inc.addEventListener("click", function(){
    if(count==108){
        count=0;
        maala++;
        document.querySelector("h3").innerText="180 X "+ (maala);


    }
    count++;
    document.querySelector("h2").innerText=count;
    if(count==108){
        audio.play();
    }
});
dec.addEventListener("click", function(){
    if(count>0){
    count--;
    }
    document.querySelector("h2").innerText=count;
}); 
