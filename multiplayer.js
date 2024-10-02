const canvas = document.getElementById('pingpong-table');
const ctx = canvas.getContext('2d');

// Game variables
let player1Paddle = { x: 10, y: canvas.height / 2 - 50, width: 10, height: 100, dy: 0 };
let player2Paddle = { x: canvas.width - 20, y: canvas.height / 2 - 50, width: 10, height: 100, dy: 0 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 7, dx: 5, dy: 5 };
let player1Score = 0;
let player2Score = 0;
const maxScore = 6;

// Key control states
let player1Up = false;
let player1Down = false;
let player2Up = false;
let player2Down = false;

// Game loop
function update() {
    movePlayer1();
    movePlayer2();
    moveBall();
    detectCollisions();
    draw();

    // Check if the game is over
    if (player1Score === maxScore || player2Score === maxScore) {
        declareWinner();
        resetGame();
    }
}

// Player 1 movement
function movePlayer1() {
    if (player1Up && player1Paddle.y > 0) {
        player1Paddle.y -= 5;
    } else if (player1Down && player1Paddle.y + player1Paddle.height < canvas.height) {
        player1Paddle.y += 5;
    }
}

// Player 2 movement
function movePlayer2() {
    if (player2Up && player2Paddle.y > 0) {
        player2Paddle.y -= 5;
    } else if (player2Down && player2Paddle.y + player2Paddle.height < canvas.height) {
        player2Paddle.y += 5;
    }
}

// Ball movement
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Ball goes off the screen (Player 1 scores)
    if (ball.x + ball.radius > canvas.width) {
        player1Score++;
        resetBall();
    } 
    // Ball goes off the screen (Player 2 scores)
    else if (ball.x - ball.radius < 0) {
        player2Score++;
        resetBall();
    }
}

// Detect collisions with paddles
function detectCollisions() {
    // Collision with Player 1's paddle
    if (ball.x - ball.radius < player1Paddle.x + player1Paddle.width &&
        ball.y > player1Paddle.y && ball.y < player1Paddle.y + player1Paddle.height) {
        ball.dx *= -1;
    }

    // Collision with Player 2's paddle
    if (ball.x + ball.radius > player2Paddle.x &&
        ball.y > player2Paddle.y && ball.y < player2Paddle.y + player2Paddle.height) {
        ball.dx *= -1;
    }
}

// Reset ball to the center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

// Reset the entire game
function resetGame() {
    player1Score = 0;
    player2Score = 0;
    resetBall();
}

// Draw the game elements
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player 1 paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(player1Paddle.x, player1Paddle.y, player1Paddle.width, player1Paddle.height);

    // Draw player 2 paddle
    ctx.fillRect(player2Paddle.x, player2Paddle.y, player2Paddle.width, player2Paddle.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw scores
    ctx.font = '30px Arial';
    ctx.fillText(player1Score, canvas.width / 4, 50);  // Player 1 score
    ctx.fillText(player2Score, 3 * canvas.width / 4, 50);  // Player 2 score
}

// Declare the winner
function declareWinner() {
    if (player1Score === maxScore) {
        alert('Player 1 wins!');
    } else {
        alert('Player 2 wins!');
    }
}

// Listen for keypresses (W - up, Z - down for Player 1; U - up, N - down for Player 2)
document.addEventListener('keydown', function(event) {
    if (event.key === 'w') {
        player1Up = true;
    }
    if (event.key === 'z') {
        player1Down = true;
    }
    if (event.key === 'u') {
        player2Up = true;
    }
    if (event.key === 'n') {
        player2Down = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'w') {
        player1Up = false;
    }
    if (event.key === 'z') {
        player1Down = false;
    }
    if (event.key === 'u') {
        player2Up = false;
    }
    if (event.key === 'n') {
        player2Down = false;
    }
});

// Start game loop
setInterval(update, 1000 / 60);  // 60 frames per second
