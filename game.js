// Breakout Game - Following MDA Framework
// No canvas, pure DOM manipulation for 60 FPS performance

class BreakoutGame {
    constructor() {
        // Game state
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.lives = 3; // 2025-10-20_15-59_EEST leave 3 lives
        this.level = 1;
        this.timer = 0;
        this.startTime = 0;  // 2025-10-15_16-10_EEST - Track game start time for timer
        this.elapsedTime = 0;  // 2025-10-15_16-10_EEST - Elapsed time in milliseconds
        this.timeLimit = 300000;  // 2025-10-20_15-53_EEST implemented - 5 minutes in milliseconds (production)
        // TEST DEV Limit this.timeLimit = 60000;  // 2025-10-20_15-54_EEST - 1 minute for testing
        // this.version = '0.2.1';  /* 2025-10-20_15-03_EEST - feature/timer in progress - Timer stops game at 0:00:000 */
        // this.version = '0.3.0';  // 2025-10-20_15-03_EEST - feature/timer COMPLETE - cleaned up comments Seåan
        // this.version = '0.3.1';  // 2025-10-20_17-12_EEST - feature/levels Z-index layering system implemented
        // this.version = '0.3.2';  // 2025-10-20_18-32_EEST - feature/levels translateZ(0) force compositor layers
        // this.version = '0.3.5';  // 2025-10-21_09-45_EEST - feature/fps-start-pause-over baseline
        // this.version = '0.3.6';  // 2025-10-21_09-50_EEST - Force 60fps with opacity flicker
        this.version = '0.4.0';  // 2025-10-21_10-54_EEST - FEATURE COMPLETE: 60fps all states

        // Game objects
        this.paddle = null;
        this.ball = null;
        this.bricks = [];
        
        // Game constants (Mechanics)
        this.config = {
            /* paddleSpeed: 8, */  /* ❌ Too fast for comfortable control */
            paddleSpeed: 6,  // ✅ 2025-10-06_03-15_EEST slowed down for better control
            paddleWidth: 80,
            paddleHeight: 12,
            ballSize: 12,
            /* ballSpeed: 3, */  /* ❌ Ball too fast with Bug #5 multiple loops */
            /* ballSpeed: 2, */  /* ❌ Ball too slow after Bug #5 fix */
            /* ballSpeed: 2.5, */  /* ❌ Still too slow */
            ballSpeed: 3,  // ✅ 2025-10-06_03-15_EEST increased for better gameplay
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
        // this.paddle.style.left = this.paddleX + 'px'; /* ❌ this triggers reflow */
        this.paddle.style.transform = `translate3d(${this.paddleX}px, 0, 0)`;  // ✅ GPU-accelerated
        
        this.setupEventListeners();
        this.createBricks();
        this.resetBall();
        this.showStartScreen();

        /* Start game loop - runs continuously from page load */
        /* ✅ Bug #6 fix: Start loop only once here, never restart it */
        // 2025-10-06_03-53_EEST - Loop runs continuously, update() handles paused state
        this.gameLoop(performance.now());
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

        // this.ball.style.left = this.ballX + 'px';  // ❌ triggers reflow
        // this.ball.style.top = this.ballY + 'px';   // ❌ triggers reflow
        this.ball.style.transform = `translate3d(${this.ballX}px, ${this.ballY}px, 0)`;  // ✅ GPU-accelerated
    }
    
    showStartScreen() {
        // Initial game state display
        this.updateUI();
    }
    
    startGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        this.startTime = performance.now();  // 2025-10-15_16-13_EEST - Initialize timer when game starts
        this.elapsedTime = 0;  // 2025-10-15_16-13_EEST - Reset elapsed time for new game
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('game-over').classList.add('hidden');
        document.getElementById('pause-menu').classList.add('hidden');
        /* this.gameLoop(performance.now()); */  /* ❌ Bug #6: Creates multiple game loops on new game start */
        // 2025-10-06_03-53_EEST removed - loop already running from init(), same issue as Bug #5
    }
    
    togglePause() {
        if (!this.gameRunning) return;

        this.gamePaused = !this.gamePaused;
        const pauseMenu = document.getElementById('pause-menu');

        if (this.gamePaused) {
            pauseMenu.classList.remove('hidden');
        } else {
            pauseMenu.classList.add('hidden');
            /* this.gameLoop(performance.now()); */  /* ❌ Bug #5: Creates multiple game loops on unpause causing FPS to drop to 4.8 */
            // 2025-10-06_03-07_EEST removed - game loop already running continuously, no need to restart it
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
        // this.paddle.style.left = this.paddleX + 'px'; // ❌ triggers reflow
        this.paddle.style.transform = `translate3d(${this.paddleX}px, 0, 0)`;  // ✅ GPU-accelerated (Bug #3 fix) 
  

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
        // Schedule next frame FIRST to ensure consistent 60 FPS timing
        // 2025-10-14_22-50_EEST - Fixed: requestAnimationFrame at start prevents throttling during pause
        requestAnimationFrame((time) => this.gameLoop(time));

        // Calculate FPS
        // 2025-10-10_03-50_EEST - Added FPS counter for performance monitoring
        if (this.lastFrameTime > 0) {
            const delta = currentTime - this.lastFrameTime;
            const currentFps = 1000 / delta;
            // Smooth FPS with exponential moving average
            this.fps = this.fps * 0.9 + currentFps * 0.1;

            // Update FPS display every 10 frames to reduce DOM updates
            this.frameCount++;
            if (this.frameCount % 10 === 0) {
                document.getElementById('fps-value').textContent = Math.round(this.fps);
            }
        }
        this.lastFrameTime = currentTime;

        // Update timer (runs even when paused to force 60 FPS rendering)
        // 2025-10-15_16-14_EEST - Calculate elapsed time for millisecond timer display
        if (this.gameRunning && !this.gamePaused && this.startTime > 0) {
            this.elapsedTime = currentTime - this.startTime;

            // 2025-10-20_15-05_EEST - Check if timer has run out
            if (this.elapsedTime >= this.timeLimit) {
                this.gameOver('time');  // Game over due to time running out
            }
        }

        // Update UI every frame to force Chrome to render at 60 FPS
        // 2025-10-15_16-14_EEST - Timer updates every frame (~16.67ms) for consistent rendering
        this.updateUI();

        // if (!this.gameRunning || this.gamePaused) return;
        // 2025-10-06_02-15_EEST commented out moved to update()
        this.update();
        this.render();
    }
    
    update() {
        
         if (!this.gameRunning || this.gamePaused) return;
        // skip update if game not running or gamePaused. 
        
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
        // Only update position values, NOT DOM - render() handles all DOM updates
        // 2025-10-14_22-45_EEST - Fixed: Separated logic from rendering for true 60 FPS
        if (this.keys.left && this.paddleX > 0) {
            this.paddleX = Math.max(0, this.paddleX - this.config.paddleSpeed);
        }

        if (this.keys.right && this.paddleX < 720) {
            this.paddleX = Math.min(720, this.paddleX + this.config.paddleSpeed);
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
    
    gameOver(reason = 'lives') {  // 2025-10-20_15-12_EEST - Added reason parameter: 'lives' or 'time'
        this.gameRunning = false;

        // Update message based on reason
        const gameOverDiv = document.getElementById('game-over');
        const gameOverHeading = gameOverDiv.querySelector('h2');

        if (reason === 'time') {
            gameOverHeading.textContent = 'Game Over - Time Up!';
        } else {
            gameOverHeading.textContent = 'Game Over';
        }

        document.getElementById('final-score').textContent = this.score;
        gameOverDiv.classList.remove('hidden');
        // close pause menu if open
        document.getElementById('pause-menu').classList.add('hidden');
        document.getElementById('start-screen').classList.add('hidden');
        // Optionally, you can add logic to quit the game entirely
        // wait for user to press Q to quit or Escape and then close window
        // window.close(); // Uncomment this line to close the window on game over
    }
    
    // render() {
        // Update ball position
        // this.ball.style.left = this.ballX + 'px'; // ❌ CPU-based
        // this.ball.style.top = this.ballY + 'px'; // ❌ CPU-based
    //}

    render() {
        // Skip render if game not running or paused - no need to update DOM
        // 2025-10-09_22-35_EEST - FPS optimization: avoid unnecessary DOM updates
        // 2025-10-14_22-45_EEST - Fixed: Render both ball AND paddle here (not in update loop)
        // 2025-10-14_23-17_EEST on advice of Gemini (and others)
        // if (!this.gameRunning || this.gamePaused) return;

        // Update all game object positions in a single render pass - GPU-accelerated
        this.ball.style.transform = `translate3d(${this.ballX}px, ${this.ballY}px, 0)`;
        this.paddle.style.transform = `translate3d(${this.paddleX}px, 0, 0)`;
        
        // 2025-10-21_09-50_EEST - Force Chrome to render at 60fps even when paused
        // Tiny imperceptible opacity flicker (0.999-1.0) forces compositor update
        this.ball.style.opacity = 0.999 + (this.frameCount % 2) * 0.001;
    }
    

    updateUI() {
        // 2025-10-15_16-15_EEST - Format timer as MM:SS:mmm countdown
        // Calculate remaining time from timeLimit
        const remainingTime = Math.max(0, this.timeLimit - this.elapsedTime);
        const totalSeconds = Math.floor(remainingTime / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor(remainingTime % 1000);

        // Format as MM:SS:mmm (e.g., "1:00:000" or "0:59:983")
        const timerText = `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
        document.getElementById('timer-value').textContent = timerText;

        document.getElementById('score-value').textContent = this.score;
        document.getElementById('lives-value').textContent = this.lives;
        document.getElementById('level-value').textContent = this.level;
        document.getElementById('version-value').textContent = this.version;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new BreakoutGame();
});