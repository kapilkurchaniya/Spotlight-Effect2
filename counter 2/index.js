var inc= document.querySelector("#incrementBtn");
var dec = document.querySelector("#decrementBtn");

var count = 0;
inc.addEventListener("click", function(){
    count++;
    document.querySelector("h2").innerText=count;
});
dec.addEventListener("click", function(){
    count--;
    document.querySelector("h2").innerText=count;

    


});
   