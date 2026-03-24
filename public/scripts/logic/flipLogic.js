import { directions } from "./moveValidator.js";

const getFlipsInDirection = (board, row, col, dx, dy, player) => {
  const opponent = player === "black" ? "white" : "black";

  let r = row + dx;
  let c = col + dy;

  const flips = [];

  if (
    r < 0 || r >= 8 ||
    c < 0 || c >= 8 ||
    board[r][c] !== opponent
  ) return [];

  while (r >= 0 && r < 8 && c >= 0 && c < 8) {
    if (board[r][c] === null) return [];
    if (board[r][c] === player) return flips;

    flips.push([r, c]);
    r += dx;
    c += dy;
  }

  return [];
};

export const getAllFlips = (board, row, col, player) => {
  let allFlips = [];

  directions.forEach(([dx, dy]) => {
    allFlips = allFlips.concat(
      getFlipsInDirection(board, row, col, dx, dy, player),
    );
  });

  return allFlips;
};
