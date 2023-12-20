import createGame from "./game.js";

// Constants
const ROWS = 3;
const COLS = 3;

// Variable
let game;

// Selectors
const template = document.getElementById("game-cell");
const gameBoard = document.getElementById("game-board");
const btn = document.getElementById("game-btn");

// Create Player Factory Function
const createPlayer = (defaultName, defaultSymbol) => {
    // Prompt for player name
    const name = window.prompt(`Enter ${defaultName}'s name:`, defaultName);
    const symbol = defaultSymbol;
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol };
  };  

// Create Board Function
const createBoard = (game) => {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const cell = template.content.cloneNode(true).querySelector("div");
      cell.id = `cell-${i}-${j}`;
      cell.addEventListener("click", () => {
        game.handleCellClick(i, j);
      });
      gameBoard.appendChild(cell);
    }
  }
};

//main code
(function () {
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");

  game = createGame(player1, player2);
  createBoard(game);
  game.activate();

  btn.addEventListener("click", () => {
    game.resetGame(gameBoard);
    createBoard(game);
  });
})();
