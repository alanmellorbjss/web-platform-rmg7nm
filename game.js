let grid = [
  [' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' '],
];
const GRID_HEIGHT = grid.length;
const COLUMN_FULL = -1;
let currentToken = 'x';

dropToken = (col) => {
  row = findHighestEmptyCell(col);

  if (row != COLUMN_FULL) {
    setCell(row, col, currentPlayer());
    showToken(row, col);

    if (playerHasWon()) {
      showWinner();
    }

    changePlayer();
  }
};

isWinningRow = (row) => {
  const token = getCell(row, 0);
  if (token === ' ') return false;

  const hasWon =
    getCell(row, 1) === token &&
    getCell(row, 2) === token &&
    getCell(row, 3) === token;

  return hasWon;
};

isWinningColumn = (col) => {
  const token = getCell(0, col);
  if (token === ' ') return false;

  const hasWon =
    getCell(1, col) === token &&
    getCell(2, col) === token &&
    getCell(3, col) === token;

  return hasWon;
};

isWinningLeadingDiagonal = () => {
  const token = getCell(0, 3);
  if (token === ' ') return false;

  const hasWon =
    getCell(1, 2) === token &&
    getCell(2, 1) === token &&
    getCell(3, 0) === token;

  return hasWon;
};

isWinningTrailingingDiagonal = () => {
  const token = getCell(0, 0);
  if (token === ' ') return false;

  const hasWon =
    getCell(1, 1) === token &&
    getCell(2, 2) === token &&
    getCell(3, 3) === token;

  return hasWon;
};

playerHasWon = () => {
  const rowHasWon =
    isWinningRow(0) || isWinningRow(1) || isWinningRow(2) || isWinningRow(3);

  const columnHasWon =
    isWinningColumn(0) ||
    isWinningColumn(1) ||
    isWinningColumn(2) ||
    isWinningColumn(3);

  const hasWon =
    rowHasWon ||
    columnHasWon ||
    isWinningLeadingDiagonal() ||
    isWinningTrailingingDiagonal();
  return hasWon;
};

findHighestEmptyCell = (col) => {
  for (let row = GRID_HEIGHT - 1; row >= 0; row--) {
    if (getCell(row, col) === ' ') {
      return row;
    }
  }

  return COLUMN_FULL;
};

getCell = (row, col) => {
  return grid[row][col];
};

setCell = (row, col, token) => {
  grid[row][col] = token;
};

showToken = (row, col) => {
  let cellId = 'cell' + row + col;
  let cell = document.getElementById(cellId);
  cell.innerHTML = getCell(row, col);
};

showWinner = () => {
  let uiWinner = document.getElementById('winner');
  uiWinner.innerHTML = currentToken + ' wins!';
};

currentPlayer = () => {
  return currentToken;
};

changePlayer = () => {
  if (currentToken === 'x') {
    currentToken = 'o';
  } else {
    currentToken = 'x';
  }
};
