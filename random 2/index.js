var a = document.querySelector('button');
var m = document.querySelector('main');

var arr = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray', 'black'];
a.addEventListener('click', function() {
var h1 = document.createElement('h1');
var x = Math.floor(Math.random() * arr.length);
var y = Math.floor(Math.random() * 90);
var z = Math.floor(Math.random() * 90);
var b = Math.floor(Math.random() * 360);
var c = Math.floor(Math.random() * 100);
h1.style.position = 'absolute';
h1.style.top = y + '%';
h1.style.left = z + '%';
h1.style.rotate = b + 'deg';
h1.style.fontSize = c + 'px';
h1.innerText = 'You will win kapil';
h1.style.color = arr[x];
h1.style.backgroundColor = arr[x+1 % arr.length];


m.appendChild(h1);
});