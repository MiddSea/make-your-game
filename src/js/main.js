/**
 * Main entry point for the game
 */

// Game configuration
const config = {
    canvas: {
        width: 800,
        height: 600
    },
    fps: 60
};

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Game initializing...');
    
    // Get canvas element
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = config.canvas.width;
    canvas.height = config.canvas.height;
    
    // Placeholder - draw initial screen
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Will Start Here', canvas.width / 2, canvas.height / 2);
    
    console.log('Game initialized successfully');
});

// Export config for use in other modules
export { config };
