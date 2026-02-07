var text = document.querySelector("h1");
var h1 = text.innerText;
var box = document.querySelector(".box");
const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>/?`~ ";
let iterations = 0;

box.addEventListener("mouseenter", () => {
function animateText() {
    const strv =h1.split("").map((letter, index) => {
        if(index < iterations) {
            return [letter];
        }
        return char.split("")[Math.floor(Math.random() * char.length)];
}).join("");

    text.innerText = strv;
    iterations +=  0.50;
   
}

    setInterval(animateText, 50);
});
