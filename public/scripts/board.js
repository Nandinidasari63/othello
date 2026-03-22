const createDisc = (row, col, color) => {
  const board = document.getElementById("board");
  const size = 50;

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

const renderBoard = () => {
  const board = document.getElementById("board");
  const size = 50;

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
  board.addEventListener("click", (e) => {
    const col = Math.floor(e.offsetX / size);
    const row = Math.floor(e.offsetY / size);

    createDisc(row, col, "black"); // always black for now
  });
};

window.onload = renderBoard;
