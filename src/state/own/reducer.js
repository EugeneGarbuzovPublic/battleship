import { ADD_SHIP_PART } from './actionTypes';
import squareStates from '../../domain/squareStates';

/*todo add arrangement modes (drag'n'drop)*/
/*todo consider removing*/

const initialGrid = new Array(10).fill(new Array(10).fill(squareStates));

function addShipPart(grid, x, y) {
    if (grid[x][y] !== squareStates.EMPTY) {
        return grid;
    }

    if (x - 1 >= 0) {
        if (y - 1 >= 0) {
            if (grid[x - 1][y - 1] !== squareStates.EMPTY) {
                return grid;
            }
        }
        if (y + 1 <= 9) {
            if (grid[x - 1][y + 1] !== squareStates.EMPTY) {
                return grid;
            }
        }
    }

    if (x + 1 <= 9) {
        if (y - 1 >= 0) {
            if (grid[x + 1][y - 1] !== squareStates.EMPTY) {
                return grid;
            }
        }
        if (y + 1 <= 9) {
            if (grid[x + 1][y + 1] !== squareStates.EMPTY) {
                return grid;
            }
        }
    }

    /*todo continue: fix these cases*/
    if (x - 1 >= 0 && x + 1 <= 9
        && grid[x - 1][y] !== squareStates.EMPTY
        && grid[x + 1][y] !== squareStates.EMPTY) {
        return grid;
    }

    if (y - 1 >= 0 && y + 1 <= 9
        && grid[x][y - 1] !== squareStates.EMPTY
        && grid[x][y + 1] !== squareStates.EMPTY) {
        return grid;
    }

    const newRow = [...grid[x]];
    newRow[x][y] = squareStates.INTACT;
    const newGrid = [...grid];
    newGrid[x] = newRow;
    return newGrid;
}

export default function (state = initialGrid, action) {
    switch (action.type) {
        case ADD_SHIP_PART:
            return addShipPart(state, action.horizontalIndex,
                action.verticalIndex);
        default:
            return state;
    }
}