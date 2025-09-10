// Breakout Game - Following MDA Framework
// No canvas, pure DOM manipulation for 60 FPS performance

class BreakoutGame {
    constructor() {
        // Game state
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        
        // Game objects
        this.paddle = null;
        this.ball = null;
        this.bricks = [];
        
        // Game constants (Mechanics)
        this.config = {
            paddleSpeed: 8,
            paddleWidth: 80,
            paddleHeight: 12,
            ballSize: 12,
            ballSpeed: 3,
            ballSpeedIncrement: 0.5,
            maxBallSpeed: 8,
            brickRows: 8,
            brickCols: 10,
            brickWidth: 78,
            brickHeight: 20,
            brickPadding: 2,
            brickOffsetTop: 60,
            brickOffsetLeft: 0
        };
        
        // Input handling
        this.keys = {
            left: false,
            right: false
        };
        
        // Performance tracking
        this.lastFrameTime = 0;
        this.frameCount = 0;
        this.fps = 0;
        
        this.init();
    }
    
    init() {
        this.gameArea = document.getElementById('game-area');
        this.bricksContainer = document.getElementById('bricks-container');
        this.paddle = document.getElementById('paddle');
        this.ball = document.getElementById('ball');
        
        // Initialize paddle position
        this.paddleX = 360;
        this.paddle.style.left = this.paddleX + 'px';
        
        this.setupEventListeners();
        this.createBricks();
        this.resetBall();
        this.showStartScreen();
    }
    
    setupEventListeners() {
        // Keyboard controls - smooth continuous movement
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'ArrowLeft':
                    this.keys.left = true;
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    this.keys.right = true;
                    e.preventDefault();
                    break;
                case 'Space':
                    if (!this.gameRunning && this.lives > 0) {
                        this.startGame();
                    } else if (!this.gameRunning && this.lives <= 0) {
                        this.resetGame();
                        this.startGame();
                    }
                    e.preventDefault();
                    break;
                case 'KeyP':
                    this.togglePause();
                    e.preventDefault();
                    break;
                case 'KeyR':
                    if (this.gamePaused) {
                        this.resetGame();
                        this.startGame();
                    }
                    e.preventDefault();
                    break;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            switch(e.code) {
                case 'ArrowLeft':
                    this.keys.left = false;
                    break;
                case 'ArrowRight':
                    this.keys.right = false;
                    break;
            }
        });
        
        // Remove button event listeners since we're using keyboard only
    }
    
    // Game objects are already created in HTML, just initialize positions
    
    createBricks() {
        this.bricksContainer.innerHTML = '';
        this.bricks = [];
        
        const colorClasses = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow'];
        const points = [7, 7, 5, 5, 3, 3, 1, 1];
        
        for (let r = 0; r < this.config.brickRows; r++) {
            this.bricks[r] = [];
            for (let c = 0; c < this.config.brickCols; c++) {
                const brick = document.createElement('div');
                brick.className = `brick brick-${colorClasses[r]}`;
                brick.style.left = c * 80 + 'px';
                brick.style.top = r * 25 + 'px';
                
                this.bricksContainer.appendChild(brick);
                
                this.bricks[r][c] = {
                    element: brick,
                    destroyed: false,
                    points: points[r],
                    x: c * 80,
                    y: r * 25
                };
            }
        }
    }
    
    resetBall() {
        this.ballX = 400;
        this.ballY = 300;
        this.ballDX = this.config.ballSpeed;
        this.ballDY = -this.config.ballSpeed;
        
        this.ball.style.left = this.ballX + 'px';
        this.ball.style.top = this.ballY + 'px';
    }
    
    showStartScreen() {
        // Initial game state display
        this.updateUI();
    }
    
    startGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('game-over').classList.add('hidden');
        document.getElementById('pause-menu').classList.add('hidden');
        this.gameLoop(performance.now());
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        const pauseMenu = document.getElementById('pause-menu');
        
        if (this.gamePaused) {
            pauseMenu.classList.remove('hidden');
        } else {
            pauseMenu.classList.add('hidden');
            this.gameLoop(performance.now());
        }
    }
    
    resetGame() {
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.gameRunning = false;
        this.gamePaused = false;
        
        // Reset ball
        this.resetBall();
        
        // Reset paddle position
        this.paddleX = 360;
        this.paddle.style.left = this.paddleX + 'px';
        
        // Reset bricks
        this.bricks.forEach(row => {
            row.forEach(brick => {
                brick.destroyed = false;
                brick.element.style.display = 'block';
            });
        });
        
        // Hide menus
        document.getElementById('pause-menu').classList.add('hidden');
        document.getElementById('game-over').classList.add('hidden');
        
        this.updateUI();
    }
    
    // Main game loop - targeting 60 FPS
    gameLoop(currentTime) {
        if (!this.gameRunning || this.gamePaused) return;
        
        // Calculate delta time for consistent motion
        const deltaTime = currentTime - this.lastFrameTime;
        const targetFrameTime = 1000 / 60; // 60 FPS
        
            this.update();
            this.render();
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update() {
        // Update paddle position based on input
        this.updatePaddle();
        
        // Update ball position
        this.updateBall();
        
        // Check collisions
        this.checkCollisions();
        
        // Check win condition
        this.checkWinCondition();
    }
    
    updatePaddle() {
        if (this.keys.left && this.paddleX > 0) {
            this.paddleX = Math.max(0, this.paddleX - this.config.paddleSpeed);
            this.paddle.style.left = this.paddleX + 'px';
        }
        
        if (this.keys.right && this.paddleX < 720) {
            this.paddleX = Math.min(720, this.paddleX + this.config.paddleSpeed);
            this.paddle.style.left = this.paddleX + 'px';
        }
    }
    
    updateBall() {
        this.ballX += this.ballDX;
        this.ballY += this.ballDY;
        
        // Wall collisions
        if (this.ballX + this.config.ballSize > 800 || this.ballX < 0) {
            this.ballDX = -this.ballDX;
        }
        
        if (this.ballY < 60) {
            this.ballDY = -this.ballDY;
        }
        
        // Bottom boundary - lose life
        if (this.ballY > 600) {
            this.loseLife();
        }
    }
    
    checkCollisions() {
        // Paddle collision
        const paddleY = 570;
        
        if (this.ballY + this.config.ballSize >= paddleY &&
            this.ballY <= paddleY + this.config.paddleHeight &&
            this.ballX + this.config.ballSize >= this.paddleX &&
            this.ballX <= this.paddleX + this.config.paddleWidth) {
            
            // Calculate angle based on where ball hits paddle
            const hitPos = (this.ballX - this.paddleX) / this.config.paddleWidth;
            const angle = (hitPos - 0.5) * Math.PI / 3; // -60 to 60 degrees
            
            const speed = Math.sqrt(this.ballDX * this.ballDX + this.ballDY * this.ballDY);
            this.ballDX = speed * Math.sin(angle);
            this.ballDY = -Math.abs(speed * Math.cos(angle));
        }
        
        // Brick collisions
        for (let r = 0; r < this.config.brickRows; r++) {
            for (let c = 0; c < this.config.brickCols; c++) {
                const brick = this.bricks[r][c];
                if (!brick.destroyed) {
                    const brickY = brick.y + 60; // offset for UI
                    
                    if (this.ballX + this.config.ballSize >= brick.x &&
                        this.ballX <= brick.x + 78 &&
                        this.ballY + this.config.ballSize >= brickY &&
                        this.ballY <= brickY + 20) {
                        
                        this.ballDY = -this.ballDY;
                        brick.destroyed = true;
                        brick.element.style.display = 'none';
                        this.score += brick.points;
                        this.updateUI();
                    }
                }
            }
        }
    }
    
    checkWinCondition() {
        const allDestroyed = this.bricks.every(row => 
            row.every(brick => brick.destroyed)
        );
        
        if (allDestroyed) {
            this.nextLevel();
        }
    }
    
    nextLevel() {
        this.level++;
        this.config.ballSpeed = Math.min(
            this.config.ballSpeed + this.config.ballSpeedIncrement,
            this.config.maxBallSpeed
        );
        
        // Reset bricks
        this.bricks.forEach(row => {
            row.forEach(brick => {
                brick.destroyed = false;
                brick.element.style.display = 'block';
            });
        });
        
        this.resetBall();
        this.updateUI();
    }
    
    loseLife() {
        this.lives--;
        this.updateUI();
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            // Stop the game and reset ball position, wait for space to continue
            this.gameRunning = false;
            this.resetBall();
        }
    }
    
    gameOver() {
        this.gameRunning = false;
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('game-over').classList.remove('hidden');
    }
    
    render() {
        // Update ball position
        this.ball.style.left = this.ballX + 'px';
        this.ball.style.top = this.ballY + 'px';
    }
    
    updateUI() {
        document.getElementById('score-value').textContent = this.score;
        document.getElementById('lives-value').textContent = this.lives;
        document.getElementById('level-value').textContent = this.level;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new BreakoutGame();
});