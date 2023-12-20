const gameStatus = document.getElementById("game-status");
const ROWS = 3;
const COLS = 3;

let board = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(null));
let isGameActive = false;

// Create Game Factory Function
const createGame = (player1, player2) => {
  let currentPlayer = player1;
  const activate = () => {
    isGameActive = true;
  };
  const togglePlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };
  const checkForWin = (row, col) => {
    const symbol = currentPlayer.getSymbol();
    console.log(row, col);
    console.table(board);
    // Check for horizontal win

    if (
      checkConsecutive(board[row][0], symbol) &&
      checkConsecutive(board[row][1], symbol) &&
      checkConsecutive(board[row][2], symbol)
    ) {
      updateGameStatus(`${currentPlayer.getName()} wins horizontally!`);
      isGameActive = false;
      return;
    }

    // Check for vertical win
    if (
      checkConsecutive(board[0][col], symbol) &&
      checkConsecutive(board[1][col], symbol) &&
      checkConsecutive(board[2][col], symbol)
    ) {
      updateGameStatus(`${currentPlayer.getName()} wins vertically!`);
      isGameActive = false;
      return;
    }

    // Check for diagonal win (from top-left to bottom-right)
    if (
      row === col &&
      checkConsecutive(board[0][0], symbol) &&
      checkConsecutive(board[1][1], symbol) &&
      checkConsecutive(board[2][2], symbol)
    ) {
      updateGameStatus(`${currentPlayer.getName()} wins diagonally!`);
      isGameActive = false;
      return;
    }

    // Check for diagonal win (from top-right to bottom-left)
    if (
      row + col === 2 &&
      checkConsecutive(board[0][2], symbol) &&
      checkConsecutive(board[1][1], symbol) &&
      checkConsecutive(board[2][0], symbol)
    ) {
      updateGameStatus(`${currentPlayer.getName()} wins diagonally!`);
      isGameActive = false;
      return;
    }

    // If no win is detected, check for a draw
    checkForTie();
  };
  const checkConsecutive = (cell, symbol) => cell === symbol;
  const checkForTie = () => {
    if (board.flat().every((cell) => cell !== null)) {
      updateGameStatus("The game ends in a draw");
      isGameActive = false;
    }
  };

  const handleCellClick = (row, col) => {
    if (!isGameActive || board[row][col] !== null) return;
    board[row][col] = currentPlayer.getSymbol();
    const disc = document.getElementById(`cell-${row}-${col}`);
    disc.textContent = currentPlayer.getSymbol();
    checkForWin(row, col);
    checkForTie();
    togglePlayer();
    updateGameStatus(`${currentPlayer.getName()}'s turn`);
  };

  const resetGame = (gameBoard) => {
    // Clear the content of each cell
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const cell = document.getElementById(`cell-${i}-${j}`);
        cell.textContent = "";
      }
    }
    board = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(null));
    currentPlayer = player1;
    isGameActive = true;
    updateGameStatus(`${currentPlayer.getName()}'s turn`);
    gameBoard.innerText = "";
  };
  const updateGameStatus = (message) => {
    if (!isGameActive) return;
    gameStatus.innerText = `${currentPlayer.getSymbol()}: ${message}`;
  };
  return { activate, handleCellClick, resetGame };
};

export default createGame;
//console.table will print
//const game = createGame();
