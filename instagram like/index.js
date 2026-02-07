
var img = document.querySelector('img')
var love = document.querySelector('#icon')

img.addEventListener('dblclick', function () {

    love.style.opacity = 1
    love.style.transform = 'translate(-50%,-50%) scale(1) rotate(0deg)'

    setTimeout(function () {
        love.style.transform = 'translate(-50%,-350%) scale(1) rotate(60deg)'
    }, 800)
    setTimeout(function () {
        love.style.opacity = 0
    }, 950)
    setTimeout(function () {
        love.style.transform = 'translate(-50%,-50%) scale(0) rotate(-60deg)'
    }, 1100)

})
