import { gameBoard } from "./boardState.js";
import { getAllFlips } from "./flipLogic.js";
import {
  clearHighlights,
  highlightCell,
  renderBoardUI,
  renderDisc,
} from "./renderer.js";

const size = 50;
const getWinner = () => {
  let black = 0;
  let white = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (gameBoard[row][col] === "black") black++;
      if (gameBoard[row][col] === "white") white++;
    }
  }

  if (black > white) return "Black wins!";
  if (white > black) return "White wins!";
  return "It's a draw!";
};
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
const hasAnyValidMove = (player) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (
        gameBoard[row][col] === null &&
        isValidMove(row, col, player)
      ) {
        return true;
      }
    }
  }
  return false;
};

const flipDiscs = (flips, player) => {
  flips.forEach(([r, c]) => {
    gameBoard[r][c] = player;
    renderDisc(r, c, player);
  });
};
const updateGameInfo = (player) => {
  const blackCount = gameBoard.flat().filter((c) => c === "black").length;
  const whiteCount = gameBoard.flat().filter((c) => c === "white").length;

  document.getElementById("score").textContent =
    `Black: ${blackCount} | White: ${whiteCount}`;
  document.getElementById("turn").textContent = `${
    player.charAt(0).toUpperCase() + player.slice(1)
  }'s turn`;
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
const displayWinner = () => {
  const blackCount = gameBoard.flat().filter((c) => c === "black").length;
  const whiteCount = gameBoard.flat().filter((c) => c === "white").length;

  const board = document.getElementById("board");
  board.innerHTML = "";

  const scoreDiv = document.getElementById("score");
  scoreDiv.innerHTML = `
    Game Over! <br>
    Black: ${blackCount} | White: ${whiteCount} <br>
    ${
    blackCount > whiteCount
      ? "Black wins!"
      : whiteCount > blackCount
      ? "White wins!"
      : "It's a tie!"
  }
  `;
  const turnDiv = document.getElementById("turn");
  turnDiv.innerHTML =
    `<button id="restartBtn" style="margin-top:10px; font-size:16px;">Restart Game</button>`;

  document.getElementById("restartBtn").addEventListener("click", restartGame);
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
    if (!hasAnyValidMove(currentPlayer)) {
      currentPlayer = currentPlayer === "black" ? "white" : "black";
    }

    if (
      !hasAnyValidMove("black") &&
      !hasAnyValidMove("white")
    ) {
      displayWinner();
    }
    showValidMoves(currentPlayer);
    updateGameInfo(currentPlayer);
  });

  initializeGame();
  showValidMoves(currentPlayer);
  updateGameInfo(currentPlayer);
};

window.onload = startGame;
