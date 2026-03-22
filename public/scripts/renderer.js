const size = 50;

export const renderBoardUI = () => {
  const board = document.getElementById("board");

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );

      rect.setAttribute("x", col * size);
      rect.setAttribute("y", row * size);
      rect.setAttribute("width", size);
      rect.setAttribute("height", size);
      rect.setAttribute("fill", "green");
      rect.setAttribute("stroke", "black");

      board.appendChild(rect);
    }
  }
};

export const renderDisc = (row, col, color) => {
  const board = document.getElementById("board");

  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );

  circle.setAttribute("cx", col * size + size / 2);
  circle.setAttribute("cy", row * size + size / 2);
  circle.setAttribute("r", size / 2 - 5);
  circle.setAttribute("fill", color);

  board.appendChild(circle);
};
export const highlightCell = (row, col, player) => {
  const board = document.getElementById("board");
  const size = 50;

  const hint = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );

  hint.setAttribute("cx", col * size + size / 2);
  hint.setAttribute("cy", row * size + size / 2);
  hint.setAttribute("r", size / 2 - 10);

  hint.setAttribute("fill", "none"); // no fill
  hint.setAttribute("stroke", player); // black or white
  hint.setAttribute("stroke-width", "2");

  hint.setAttribute("class", "hint");

  board.appendChild(hint);
};

export const clearHighlights = () => {
  document.querySelectorAll(".hint").forEach((el) => el.remove());
};
