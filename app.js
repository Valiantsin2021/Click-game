const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0
let circle;
const colors = ['#a1fc03', '#0324fc', '#14c422', '#c720ab', '#eb3e09', '#1dd5db', '#6505f5']
function startSelect() {
    startBtn.addEventListener('click', (event) => {
        event.preventDefault()
        screens[0].classList.add('up')
    })
}
function startTime() {
    timeList.addEventListener('click', event => {
        if(event.target.classList.contains('time-btn')) {
            time = parseInt(event.target.getAttribute('data-time'))
            screens[1].classList.add('up')
            startGame()
        }
    })
}

function addBoard() {
    board.addEventListener('click', event => {
        if(event.target.classList.contains('circle')) {
            score++
            event.target.remove()
            createRandomCircle()
        }
})
}
function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if(time === 0) {
        board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
        sleep(3000).then(() => location.reload())
    } else {
        let current = --time 
    if(current < 10) {
        current = `0${current}`
    }
    setTime(current)
    } 
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function createRandomCircle() {
    circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const { width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    const color = colors[~~(Math.random() * colors.length)]
    circle.style.backgroundColor = color
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
    board.append(circle)
}

function getRandomNumber(min, max) {
   return Math.round((Math.random() * (max-min) + min))
}

startSelect()
startTime()
addBoard()

function hack(ms) {
    function single() {
    let circle = document.querySelector('.circle')
    circle.click()
    }
    setInterval(single, ms)
}
const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    })
}