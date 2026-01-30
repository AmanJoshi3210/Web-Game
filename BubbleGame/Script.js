// Game Constants
const BUBBLE_COUNT = 60;
const INITIAL_TIME = 60;

// Game State
let gameState = {
    score: 0,
    timer: INITIAL_TIME,
    targetNumber: 0,
    status: 'IDLE', // IDLE, PLAYING, FINISHED
    timerInterval: null
};

// DOM Elements
const startScreen = document.getElementById('start-screen');
const playScreen = document.getElementById('play-screen');
const finishScreen = document.getElementById('finish-screen');
const bubbleGrid = document.getElementById('bubble-grid');
const targetDisplay = document.getElementById('target-number');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('final-score');

const startBtn = document.getElementById('start-btn');
const replayBtn = document.getElementById('replay-btn');
const menuBtn = document.getElementById('menu-btn');

/**
 * Initialize and start the game
 */
function startGame() {
    gameState.score = 0;
    gameState.timer = INITIAL_TIME;
    gameState.status = 'PLAYING';
    
    updateScoreUI();
    updateTimerUI();
    generateNewRound();
    
    // UI Transitions
    startScreen.classList.add('hidden');
    finishScreen.classList.add('hidden');
    playScreen.classList.remove('hidden');
    playScreen.classList.add('fade-in');

    // Start Timer
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    gameState.timerInterval = setInterval(() => {
        gameState.timer--;
        updateTimerUI();
        
        if (gameState.timer <= 0) {
            endGame();
        }
    }, 1000);
}

/**
 * End the game and show results
 */
function endGame() {
    gameState.status = 'FINISHED';
    clearInterval(gameState.timerInterval);
    
    finalScoreDisplay.textContent = gameState.score;
    
    playScreen.classList.add('hidden');
    finishScreen.classList.remove('hidden');
    finishScreen.classList.add('fade-in');
}

/**
 * Go back to main menu
 */
function goToMenu() {
    gameState.status = 'IDLE';
    finishScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    startScreen.classList.add('fade-in');
}

/**
 * Update the Target Number and re-render the bubbles
 */
function generateNewRound() {
    gameState.targetNumber = Math.floor(Math.random() * 10);
    targetDisplay.textContent = gameState.targetNumber;
    renderBubbles();
}

/**
 * Create and render the bubble grid
 */
function renderBubbles() {
    bubbleGrid.innerHTML = '';
    
    for (let i = 0; i < BUBBLE_COUNT; i++) {
        const val = Math.floor(Math.random() * 10);
        const bubble = document.createElement('div');
        bubble.className = 'bubble pop-animation';
        bubble.textContent = val;
        
        // Staggered animation effect
        bubble.style.animationDelay = `${Math.random() * 0.2}s`;
        
        bubble.addEventListener('click', () => handleBubbleClick(val, bubble));
        bubbleGrid.appendChild(bubble);
    }
}

/**
 * Handle logic when a bubble is clicked
 */
function handleBubbleClick(val, element) {
    if (gameState.status !== 'PLAYING') return;

    if (val === gameState.targetNumber) {
        // Correct Click
        gameState.score += 10;
        updateScoreUI();
        generateNewRound();
    } else {
        // Wrong Click
        gameState.score = Math.max(0, gameState.score - 5);
        updateScoreUI();
        
        // Visual feedback for error
        element.classList.add('bg-red-500/50', 'border-red-400');
        setTimeout(() => {
            element.classList.remove('bg-red-500/50', 'border-red-400');
        }, 200);
    }
}

function updateScoreUI() {
    scoreDisplay.textContent = gameState.score;
}

function updateTimerUI() {
    timerDisplay.textContent = `${gameState.timer}s`;
    if (gameState.timer < 10) {
        timerDisplay.classList.add('text-red-500');
    } else {
        timerDisplay.classList.remove('text-red-500');
    }
}

// Event Listeners
startBtn.addEventListener('click', startGame);
replayBtn.addEventListener('click', startGame);
menuBtn.addEventListener('click', goToMenu);

// Global shortcut: Press space to start/restart
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (gameState.status === 'IDLE' || gameState.status === 'FINISHED') {
            startGame();
        }
    }
});
