// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
let snakeHeadRotateAngle = 180;

const foodSound = new Audio('assets/music/food.mp3');
const gameOverSound = new Audio('assets/music/gameover.mp3');
const moveSound = new Audio('assets/music/move.mp3');
const musicSound = new Audio('assets/music/music.mp3');

let lastPaintTime = 0;
let speed = 10;
let score = 0;

let snakeArr = [ {x: 13,y: 15} ];

let food = { x: 4,y: 4 };

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime-lastPaintTime)/1000 < 1/speed) {
        return;
    }  

    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // Bump into itself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    // Bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }

    return false;
}

function gameEngine() {
    // Updating snake array and food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {
            x: 0, 
            y: 0
        };

        alert("Game over. Press any key to play again");
        snakeArr = [{x: 13,y: 15}];
        musicSound.play();
        score = 0;
        snakeHeadRotateAngle = 180;
    }

    // If you have eaten, increase snake length and regenerate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score++;
        scoreBox.innerHTML = "Score: " + score;

        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x, 
            y: snakeArr[0].y + inputDir.y
        });

        // Setting the range for next food
        let a = 2, b = 16;
        food = {
            x: Math.round(a + (b-a)* Math.random()), 
            y: Math.round(a + (b-a)* Math.random())
        };
    } 
    
    // Move the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        } else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
        let transformAttribute = `rotate(${snakeHeadRotateAngle}deg) scale(1.2)`;
        let headElement = document.getElementsByClassName('head')[0];
        headElement.style.transform = transformAttribute;

        /* Can be replaced with mixins for other browsers
            headElement.style.webkitTransform = transformAttribute;
            headElement.style.msTransform = transformAttribute;
        */
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');

    board.appendChild(foodElement);
    
}

// Main Logic 
musicSound.play();
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            snakeHeadRotateAngle = 180;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            snakeHeadRotateAngle = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            snakeHeadRotateAngle = 90;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            snakeHeadRotateAngle = 270;
            break;

        default:
            break;
    }
});