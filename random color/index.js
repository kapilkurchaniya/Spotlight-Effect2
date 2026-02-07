var arr = [
    {
        team: 'CSK',
        primary: 'yellow',
        secondary: 'blue',
        fullname: 'Chennai Super Kings',
        trophies: 4,
        captain: 'MS Dhoni'
    },
    {
        team: 'RCB',
        primary: 'red',
        secondary: 'black',
        fullname : 'Royal Challengers Bangalore',
        trophies: 1,
        captain: 'Virat kholi'

    },
    {
        team: 'MI',
        primary: 'blue',
        secondary: 'gold',
        fullname: 'Mumbai Indians',
        trophies: 5,
        captain: 'Rohit Sharma'
    },
    {
        team: 'KKR',
        primary: 'purple',
        secondary: 'gold',
        fullname: 'Kolkata Knight Riders',
        trophies: 2,
        captain: 'Shubman Gill',
    },
    {
        team: 'SRH',
        primary: 'orange',
        secondary: 'black',
        fullname: 'Sunrisers Hyderabad',
        trophies: 1,
        captain:  'Pat Cummins'
    },
    {
        team: 'PBKS',
        primary: 'crimson',
        secondary: 'silver',
        fullname: 'Punjab Kings',
        trophies: 3,
        captain: 'Shikhar Dhawan'
    },
]


var btn = document.querySelector('button')
var h1 = document.querySelector('h1')
var main = document.querySelector('main')
var fullname = document.querySelector('.fullname')
var trophies = document.querySelector('.trophies')
var captain = document.querySelector('.captain')
var hero = document.querySelector('header')

btn.addEventListener('click',function(){

    var winner = arr[Math.floor(Math.random()*arr.length)]

    h1.innerHTML = winner.team
    h1.style.backgroundColor = winner.secondary
    main.style.backgroundColor = winner.primary
    fullname.innerHTML = "Full Name: " + winner.fullname
    trophies.innerHTML = "Trophies Won: " + winner.trophies
    captain.innerHTML = "Captain: " + winner.captain
    // hero.style.color = winner.primary
    hero.style.backgroundColor = winner.secondary
    
})