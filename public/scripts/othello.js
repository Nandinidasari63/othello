import { gameBoard } from "./boardState.js";
import { getAllFlips } from "./flipLogic.js";
import {
  clearHighlights,
  highlightCell,
  renderBoardUI,
  renderDisc,
} from "./renderer.js";

const size = 50;

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const flipDiscs = (flips, player) => {
  flips.forEach(([r, c]) => {
    gameBoard[r][c] = player;
    renderDisc(r, c, player);
  });
};

const initializeGame = () => {
  gameBoard[3][3] = "white";
  gameBoard[3][4] = "black";
  gameBoard[4][3] = "black";
  gameBoard[4][4] = "white";

  renderDisc(3, 3, "white");
  renderDisc(3, 4, "black");
  renderDisc(4, 3, "black");
  renderDisc(4, 4, "white");
};

const checkDirection = (row, col, dx, dy, player) => {
  const opponent = player === "black" ? "white" : "black";

  let r = row + dx;
  let c = col + dy;

  if (
    r < 0 || r >= 8 ||
    c < 0 || c >= 8 ||
    gameBoard[r][c] !== opponent
  ) return false;

  while (r >= 0 && r < 8 && c >= 0 && c < 8) {
    if (gameBoard[r][c] === null) return false;
    if (gameBoard[r][c] === player) return true;

    r += dx;
    c += dy;
  }

  return false;
};

const isValidMove = (row, col, player) => {
  return directions.some(([dx, dy]) =>
    checkDirection(row, col, dx, dy, player)
  );
};

const showValidMoves = (player) => {
  clearHighlights();

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (
        gameBoard[row][col] === null &&
        isValidMove(row, col, player)
      ) {
        highlightCell(row, col, player);
      }
    }
  }
};

const startGame = () => {
  renderBoardUI();

  let currentPlayer = "black";

  const board = document.getElementById("board");

  board.addEventListener("click", (e) => {
    const col = Math.floor(e.offsetX / size);
    const row = Math.floor(e.offsetY / size);

    if (gameBoard[row][col] !== null) return;
    if (!isValidMove(row, col, currentPlayer)) return;

    gameBoard[row][col] = currentPlayer;
    renderDisc(row, col, currentPlayer);

    const flips = getAllFlips(row, col, currentPlayer, directions);
    flipDiscs(flips, currentPlayer);

    currentPlayer = currentPlayer === "black" ? "white" : "black";

    showValidMoves(currentPlayer);
  });

  initializeGame();
  showValidMoves(currentPlayer);
};

window.onload = startGame;
