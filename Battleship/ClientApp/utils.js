import { INTACT_SHIP_PART } from './domain/squareStates';

export function getShipCells(grid) {
    return grid.reduce((gridCells, row, rowIndex) =>
        gridCells.concat(row.reduce((rowCells, cellState, cellIndex) => {
            if (cellState === INTACT_SHIP_PART) {
                rowCells.push([rowIndex, cellIndex]);
            }
            return rowCells;
        },
        [])), []);
}
