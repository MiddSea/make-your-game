# JavaScript Concepts Documentation

## Core Concepts Used in Breakout Game

### 1. Game Loop Pattern
- **requestAnimationFrame**: Browser API for smooth animations
- **Delta time**: Calculating time between frames
- **Fixed time step**: Ensuring consistent game speed

### 2. DOM Manipulation
- **createElement**: Dynamic element creation
- **classList**: Managing CSS classes
- **style property**: Direct style manipulation
- **appendChild/removeChild**: DOM tree management

### 3. Event Handling
- **addEventListener**: Keyboard input handling
- **KeyboardEvent**: Key press/release detection
- **Event delegation**: Efficient event management
- **preventDefault**: Preventing default browser behavior

### 4. Object-Oriented JavaScript
- **Classes**: Game entity representation
- **Constructor functions**: Object initialization
- **Methods**: Behavior implementation
- **Inheritance**: Shared functionality

### 5. Collision Detection
- **Bounding box**: Rectangle collision detection
- **Vector math**: Direction calculations
- **Intersection algorithms**: Detecting overlaps

### 6. State Management
- **Game states**: Menu, playing, paused, game over
- **State transitions**: Managing game flow
- **Data persistence**: Score and high score tracking

### 7. Performance Optimization
- **Batch DOM updates**: Reducing reflows
- **CSS transforms**: Hardware acceleration
- **Object pooling**: Reusing game objects
- **Throttling/debouncing**: Input optimization

### 8. Modular Code Organization
- **ES6 modules**: Code separation
- **Import/export**: Dependency management
- **Separation of concerns**: MVC pattern

### 9. Browser APIs
- **Performance API**: FPS monitoring
- **LocalStorage**: Saving game state
- **Audio API**: Sound effects

### 10. Debugging Techniques
- **Console methods**: Logging and debugging
- **Chrome DevTools**: Performance profiling
- **Breakpoints**: Step-through debugging
- **Network tab**: Asset loading

## Code Examples

### Basic Game Loop
```javascript
let lastTime = 0;
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    update(deltaTime);
    render();
    
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
```

### Smooth Keyboard Input
```javascript
const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// In update loop
if (keys['ArrowLeft']) {
    paddle.moveLeft(deltaTime);
}
```

### Simple Collision Detection
```javascript
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}
```

## Learning Resources
- MDN Web Docs
- JavaScript.info
- Chrome DevTools Documentation
- Game Programming Patterns