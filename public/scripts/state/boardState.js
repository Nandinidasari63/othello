export const createBoard = () =>
  Array.from({ length: 8 }, () => Array(8).fill(null));
