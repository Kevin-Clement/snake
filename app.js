const score = document.getElementById("score");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the canvas size
canvas.width = 400;
canvas.height = 400;

// Set the direction
const UP = "up";
const DOWN = "down";
const LEFT = "left";
const RIGHT = "right";

// Set the score
let scoreValue = 0;

// Set the snake
const snakeSize = 20;
let snakeSpeed = 100;
const snakeColor = "green";
let snakeDirection = RIGHT;
let snakeBody = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 },
    { x: 140, y: 200 },
    { x: 120, y: 200 },
];

// Set the food
const foodSize = 20;
const foodColor = "red";
let foodX;
let foodY;

// Function to draw the snake
function drawSnake() {
    snakeBody.forEach((snakePart) => {
        ctx.fillStyle = snakeColor;
        ctx.strokeStyle = "black";
        ctx.fillRect(snakePart.x, snakePart.y, snakeSize, snakeSize);
        ctx.strokeRect(snakePart.x, snakePart.y, snakeSize, snakeSize);
    });
}

// Function to draw the food
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.strokeStyle = "black";
    ctx.fillRect(foodX, foodY, foodSize, foodSize);
    ctx.strokeRect(foodX, foodY, foodSize, foodSize);
}


// Function to move the snake
function moveSnake() {
    const head = { x: snakeBody[0].x, y: snakeBody[0].y };

    switch (snakeDirection) {
        case UP:
            head.y -= snakeSize;
            break;
        case DOWN:
            head.y += snakeSize;
            break;
        case LEFT:
            head.x -= snakeSize;
            break;
        case RIGHT:
            head.x += snakeSize;
            break;
    }

    snakeBody.unshift(head);

    const didEatFood = snakeBody[1].x === foodX && snakeBody[0].y === foodY;

    if (didEatFood) {
        scoreValue += 10;
        score.innerHTML = scoreValue;
        createFood();
    } else {
        snakeBody.pop();
    }
}

function random(axe){
    return Math.round((Math.random() * (axe - foodSize)) / foodSize) * foodSize;
}

// Function to create the food
function createFood() {
    foodX = random(canvas.width);
    foodY = random(canvas.height);
}

// Function to check if the snake is dead
function isSnakeDead() {
    for (let i = 4; i < snakeBody.length; i++) {
        const didCollide = snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y;
        if (didCollide) return true;
    }

    const hitLeftWall = snakeBody[0].x < 0;
    const hitRightWall = snakeBody[0].x > canvas.width - snakeSize;
    const hitTopWall = snakeBody[0].y < 0;
    const hitBottomWall = snakeBody[0].y > canvas.height - snakeSize;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

// Function to clear the canvas
function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Function to reset the game
function resetGame() {  

    snakeDirection = RIGHT;
    snakeBody = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 },
        { x: 140, y: 200 },
        { x: 120, y: 200 },
    ];
    scoreValue = 0;
    score.innerHTML = scoreValue;
    createFood();
}

// Function to change the snake direction
function changeSnakeDirection(event) {
    const keyPressed = event.keyCode;

    const upKey = 38;
    const downKey = 40;
    const leftKey = 37;
    const rightKey = 39;

    if (keyPressed === upKey && snakeDirection !== DOWN) {
        snakeDirection = UP;
    }

    if (keyPressed === downKey && snakeDirection !== UP) {
        snakeDirection = DOWN;
    }

    if (keyPressed === leftKey && snakeDirection !== RIGHT) {
        snakeDirection = LEFT;
    }

    if (keyPressed === rightKey && snakeDirection !== LEFT) {
        snakeDirection = RIGHT;
    }
}


// Function to draw the game
function drawGame() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();

    if (isSnakeDead()) {
        resetGame();
    }
}

// Function to start the game
function startGame() {
    createFood();
    setInterval(drawGame, snakeSpeed);
}

// Start the game
startGame();

// Event listener to change the snake direction
document.addEventListener("keydown", changeSnakeDirection);

// Event listener to reset the game
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        resetGame();
    }
}


    
