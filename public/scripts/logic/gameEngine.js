import { hasAnyValidMove, isValidMove } from "./moveValidator.js";
import { getAllFlips } from "./flipLogic.js";

export const initializeBoard = (board) => {
  board[3][3] = "white";
  board[3][4] = "black";
  board[4][3] = "black";
  board[4][4] = "white";
};

export const makeMove = (board, row, col, player) => {
  if (board[row][col] !== null) return false;
  if (!isValidMove(board, row, col, player)) return false;

  board[row][col] = player;

  const flips = getAllFlips(board, row, col, player);
  flips.forEach(([r, c]) => {
    board[r][c] = player;
  });

  let nextPlayer = player === "black" ? "white" : "black";

  if (!hasAnyValidMove(board, nextPlayer)) {
    nextPlayer = player;
  }

  return nextPlayer;
};

export const getWinner = (board) => {
  const flat = board.flat();
  const black = flat.filter((c) => c === "black").length;
  const white = flat.filter((c) => c === "white").length;

  if (black > white) return "black";
  if (white > black) return "white";
  return "tie";
};
