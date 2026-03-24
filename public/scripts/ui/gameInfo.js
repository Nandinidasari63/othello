export const updateScore = (board) => {
  const flat = board.flat();
  const black = flat.filter((c) => c === "black").length;
  const white = flat.filter((c) => c === "white").length;

  document.getElementById("score").textContent =
    `Black: ${black} | White: ${white}`;
};

export const updateTurn = (player) => {
  document.getElementById("turn").textContent = `${
    player.charAt(0).toUpperCase() + player.slice(1)
  }'s turn`;
};

export const displayWinner = (board, winner) => {
  const flat = board.flat();
  const black = flat.filter((c) => c === "black").length;
  const white = flat.filter((c) => c === "white").length;

  const scoreDiv = document.getElementById("score");

  scoreDiv.innerHTML = `
    Game Over! <br>
    Black: ${black} | White: ${white} <br>
    ${
    winner === "black"
      ? "Black wins!"
      : winner === "white"
      ? "White wins!"
      : "It's a tie!"
  }
  `;

  const turnDiv = document.getElementById("turn");

  turnDiv.innerHTML = `
    <button id="restartBtn" style="margin-top:10px; font-size:16px;">
      Restart Game
    </button>
  `;
};
