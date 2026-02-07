var btn = document.querySelector("button");
var main = document.querySelector("main");
btn.addEventListener("click", function() {
    var a = document.createElement("div");
    var x = Math.floor(Math.random()*100);
    var y = Math.floor(Math.random()*100);
    var z = Math.floor(Math.random()*255);
    var w = Math.floor(Math.random()*255);
    var v = Math.floor(Math.random()*255);
    var r = Math.floor(Math.random()*360);
    a.style.top = x + "%";
    a.style.left = y + "%";
    a.style.position = "absolute";
    a.style.padding = "10px 20px";
    a.style.backgroundColor = "rgb(" + z + "," + w + "," + v + ")";
    a.style.border = "none";
    a.style.borderRadius = "5px";
    a.style.cursor = "pointer";
    a.style.transform = "rotate(" + r + "deg)";
    a.style.width = 100+ "px";
    a.style.height = 100 + "px";

    main.appendChild(a);
    
});
