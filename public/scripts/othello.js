import { createBoard } from "../scripts/state/boardState.js";
import {
  getWinner,
  initializeBoard,
  makeMove,
} from "../scripts/logic/gameEngine.js";
import {
  hasAnyValidMove,
  isValidMove,
} from "../scripts/logic/moveValidator.js";
import { renderBoard } from "../scripts/ui/renderer.js";
import { updateScore, updateTurn } from "../scripts/ui/gameInfo.js";
import { clearHighlights, highlightCell } from "../scripts/ui/renderer.js";
import { displayWinner } from "../scripts/ui/gameInfo.js";

let board;
let currentPlayer;

const showValidMoves = () => {
  clearHighlights();

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (
        board[r][c] === null &&
        isValidMove(board, r, c, currentPlayer)
      ) {
        highlightCell(r, c, currentPlayer);
      }
    }
  }
};

const restartGame = () => {
  startGame();
};

export const startGame = () => {
  board = createBoard();
  console.log(board);
  initializeBoard(board);

  currentPlayer = "black";

  renderBoard(board);
  updateScore(board);
  updateTurn(currentPlayer);
  showValidMoves();
  document.getElementById("board").addEventListener("click", handleClick);
};

const handleClick = (e) => {
  const size = 100;
  const col = Math.floor(e.offsetX / size);
  const row = Math.floor(e.offsetY / size);

  const nextPlayer = makeMove(board, row, col, currentPlayer);
  if (!nextPlayer) return;

  currentPlayer = nextPlayer;

  renderBoard(board);
  updateScore(board);
  updateTurn(currentPlayer);
  showValidMoves();
  if (
    !hasAnyValidMove(board, "black") &&
    !hasAnyValidMove(board, "white")
  ) {
    const winner = getWinner(board);

    displayWinner(board, winner);

    document
      .getElementById("restartBtn")
      .addEventListener("click", restartGame);
    return;
  }
};
