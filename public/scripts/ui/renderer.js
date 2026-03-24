const size = 100;

export const renderBoard = (board) => {
  const svg = document.getElementById("board");
  svg.innerHTML = "";

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );

      rect.setAttribute("x", c * size);
      rect.setAttribute("y", r * size);
      rect.setAttribute("width", size);
      rect.setAttribute("height", size);
      rect.setAttribute("fill", "green");
      rect.setAttribute("stroke", "black");

      svg.appendChild(rect);

      if (board[r][c]) {
        renderDisc(r, c, board[r][c]);
      }
    }
  }
};

export const renderDisc = (row, col, color) => {
  const svg = document.getElementById("board");

  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );

  circle.setAttribute("cx", col * size + size / 2);
  circle.setAttribute("cy", row * size + size / 2);
  circle.setAttribute("r", size / 2 - 5);
  circle.setAttribute("fill", color);

  svg.appendChild(circle);
};

export const highlightCell = (row, col, player) => {
  const svg = document.getElementById("board");

  const hint = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );

  hint.setAttribute("cx", col * size + size / 2);
  hint.setAttribute("cy", row * size + size / 2);
  hint.setAttribute("r", size / 2 - 10);

  hint.setAttribute("fill", "none");
  hint.setAttribute("stroke", player);
  hint.setAttribute("stroke-width", "2");

  hint.setAttribute("class", "hint");

  svg.appendChild(hint);
};

export const clearHighlights = () => {
  document.querySelectorAll(".hint").forEach((el) => el.remove());
};
