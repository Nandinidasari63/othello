export const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const checkDirection = (board, row, col, dx, dy, player) => {
  const opponent = player === "black" ? "white" : "black";
  let r = row + dx;
  let c = col + dy;

  if (r < 0 || r >= 8 || c < 0 || c >= 8 || board[r][c] !== opponent) {
    return false;
  }

  while (r >= 0 && r < 8 && c >= 0 && c < 8) {
    if (board[r][c] === null) return false;
    if (board[r][c] === player) return true;
    r += dx;
    c += dy;
  }

  return false;
};

export const isValidMove = (board, row, col, player) =>
  directions.some(([dx, dy]) =>
    checkDirection(board, row, col, dx, dy, player)
  );

export const hasAnyValidMove = (board, player) => {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === null && isValidMove(board, r, c, player)) {
        return true;
      }
    }
  }
  return false;
};
