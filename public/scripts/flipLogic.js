import { gameBoard } from "./boardState.js";

const getFlipsInDirection = (row, col, dx, dy, player) => {
  const opponent = player === "black" ? "white" : "black";

  let r = row + dx;
  let c = col + dy;

  const flips = [];

  if (
    r < 0 || r >= 8 ||
    c < 0 || c >= 8 ||
    gameBoard[r][c] !== opponent
  ) return [];

  while (r >= 0 && r < 8 && c >= 0 && c < 8) {
    if (gameBoard[r][c] === null) return [];

    if (gameBoard[r][c] === player) return flips;

    flips.push([r, c]);

    r += dx;
    c += dy;
  }

  return [];
};

export const getAllFlips = (row, col, player, directions) => {
  let allFlips = [];

  directions.forEach(([dx, dy]) => {
    const flips = getFlipsInDirection(row, col, dx, dy, player);
    allFlips = allFlips.concat(flips);
  });

  return allFlips;
};
