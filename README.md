# React-Tic-Tac-Toe
An interactive Tic-Tac-Toe game built with React and TypeScript, featuring move history tracking, time travel, and dynamic UI highlights.

# Features

- Play Tic-Tac-Toe: Classic 3x3 game for two players (X and O).

- Move History: Tracks every move with the exact board location (row, col).

- Time Travel: Jump to any previous move to view the game state at that point.

- Winning Highlight: The winning combination is visually highlighted when a player wins.

- Draw Detection: Detects draw situations when all squares are filled with no winner.

- Toggle Move Order: Sort the move history in ascending or descending order for easy navigation.

- Current Move Indicator: Clearly shows which move is currently being viewed.

# Technical Details

  - Built with React & TypeScript using functional components and hooks.

  - State Management: Uses useState to manage game history and current move.

  - Immutability: Each move produces a new board state, preserving history for time travel.

  - Responsive UI: Dynamic rendering of squares, moves list, and game status.

# How to Use

  1. Click on a square to place X or O.

  2. Check the game status above the board (Next player, Winner, or Draw).

  3. Use the move history list to jump to any previous move.

  4. Toggle move history order with the "Sort Ascending/Descending" button.
