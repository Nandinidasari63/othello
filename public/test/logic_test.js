import {
  getWinner,
  initializeBoard,
  makeMove,
} from "../scripts/logic/gameEngine.js";

import {
  hasAnyValidMove,
  isValidMove,
} from "../scripts/logic/moveValidator.js";

import { createBoard } from "../scripts/state/boardState.js";
import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";

describe("Othello Game Logic", () => {
  describe("Initialize Board", () => {
    it("should set initial 4 discs correctly", () => {
      const board = createBoard();
      initializeBoard(board);

      assertEquals(board[3][3], "white");
      assertEquals(board[3][4], "black");
      assertEquals(board[4][3], "black");
      assertEquals(board[4][4], "white");
    });
  });

  describe("Valid Move Check", () => {
    it("should return true for valid initial move", () => {
      const board = createBoard();
      initializeBoard(board);

      const result = isValidMove(board, 2, 3, "black");
      assertEquals(result, true);
    });

    it("should return false for invalid move", () => {
      const board = createBoard();
      initializeBoard(board);

      const result = isValidMove(board, 0, 0, "black");
      assertEquals(result, false);
    });
  });

  describe("Make Move", () => {
    it("should place disc and flip opponent discs", () => {
      const board = createBoard();
      initializeBoard(board);

      makeMove(board, 2, 3, "black");

      assertEquals(board[2][3], "black");
      assertEquals(board[3][3], "black");
    });

    it("should return false for invalid move", () => {
      const board = createBoard();
      initializeBoard(board);

      const result = makeMove(board, 0, 0, "black");

      assertEquals(result, false);
    });

    it("should switch player after valid move", () => {
      const board = createBoard();
      initializeBoard(board);

      const nextPlayer = makeMove(board, 2, 3, "black");

      assertEquals(nextPlayer, "white");
    });
  });

  describe("Has Any Valid Move", () => {
    it("should return true at initial state", () => {
      const board = createBoard();
      initializeBoard(board);

      const result = hasAnyValidMove(board, "black");

      assertEquals(result, true);
    });

    it("should return false when board is full", () => {
      const board = Array.from({ length: 8 }, () => Array(8).fill("black"));

      const result = hasAnyValidMove(board, "white");

      assertEquals(result, false);
    });
  });

  describe("Get Winner", () => {
    it("should return black as winner", () => {
      const board = Array.from({ length: 8 }, () => Array(8).fill("black"));

      const winner = getWinner(board);

      assertEquals(winner, "black");
    });

    it("should return white as winner", () => {
      const board = Array.from({ length: 8 }, () => Array(8).fill("white"));

      const winner = getWinner(board);

      assertEquals(winner, "white");
    });

    it("should return tie when equal discs", () => {
      const board = createBoard();
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          board[i][j] = (i + j) % 2 === 0 ? "black" : "white";
        }
      }

      const winner = getWinner(board);

      assertEquals(winner, "tie");
    });
  });
});
