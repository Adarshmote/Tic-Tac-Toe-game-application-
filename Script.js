let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0;
let scoreO = 0;
let timerInterval;
let time = 0;
let gameOver = false;  // Add a flag to track game state

// Initialize game
function initGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    document.getElementById('reset').addEventListener('click', resetGame);
    document.getElementById('light-theme').addEventListener('click', () => switchTheme('light'));
    document.getElementById('dark-theme').addEventListener('click', () => switchTheme('dark'));
    startTimer();
}

// Handle cell click
function handleCellClick(e) {
    if (gameOver) return;  // Prevent any moves if the game is over

    const index = e.target.dataset.index;
    if (!board[index]) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin()) {
            document.getElementById('status').textContent = `Player ${currentPlayer} Wins!`;
            updateScore();
            gameOver = true;  // Set the game over flag to true
            clearInterval(timerInterval);
        } else if (board.every(cell => cell)) {
            document.getElementById('status').textContent = "It's a Tie!";
            gameOver = true;  // Set the game over flag to true
            clearInterval(timerInterval);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Check for win
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

// Update score
function updateScore() {
    if (currentPlayer === "X") {
        scoreX++;
        document.getElementById('scoreX').textContent = scoreX;
    } else {
        scoreO++;
        document.getElementById('scoreO').textContent = scoreO;
    }
}

// Reset game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    document.getElementById('status').textContent = "Player X's turn";
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
    clearInterval(timerInterval);
    time = 0;
    gameOver = false;  // Reset the game over flag
    startTimer();
}

// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        document.getElementById('timer').textContent = `${minutes}:${seconds}`;
    }, 1000);
}

// Theme switcher
function switchTheme(theme) {
    document.body.className = theme + '-theme';
}

// Start the game with the light theme as default
switchTheme('light');
initGame();
