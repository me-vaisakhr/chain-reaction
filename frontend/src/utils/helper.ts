import { GRID_COLS, GRID_ROWS, GRID_SIZE } from "./constants";
export const getRow = (index: number) => Math.floor(index / GRID_ROWS);

export const getColumn = (index: number) => index % GRID_COLS;

export const isCorner = (index: number) => {
  const row = getRow(index);
  const col = getColumn(index);

  return (
    (row === 0 && col === 0) ||
    (row === GRID_ROWS - 1 && col === GRID_COLS - 1) ||
    (row === 0 && col === GRID_COLS - 1) ||
    (col === 0 && row === GRID_ROWS - 1)
  );
};

export const isEdge = (index: number) => {
  const row = getRow(index);
  const col = getColumn(index);

  return (
    row === 0 || row === GRID_ROWS - 1 || col === 0 || col === GRID_COLS - 1
  );
};

export const getIndex = (row: number, col: number) => {
  if (row < 0 || col < 0 || row >= GRID_ROWS || col >= GRID_COLS) {
    return -1;
  }
  return row * GRID_COLS + col;
};
