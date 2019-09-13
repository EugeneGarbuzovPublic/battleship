import { ADD_SHIP } from './actionTypes';
import { EMPTY, INTACT_SHIP_PART } from '../../domain/squareStates';

/*todo add arrangement modes (drag'n'drop)*/
/*todo consider removing*/

const initialGrid = new Array(10).fill(new Array(10).fill(EMPTY));

function addShipPart(grid, x, y) {
    if (grid[x][y] !== EMPTY) {
        return grid;
    }

    if (x - 1 >= 0) {
        if (y - 1 >= 0) {
            if (grid[x - 1][y - 1] !== EMPTY) {
                return grid;
            }
        }
        if (y + 1 <= 9) {
            if (grid[x - 1][y + 1] !== EMPTY) {
                return grid;
            }
        }
    }

    if (x + 1 <= 9) {
        if (y - 1 >= 0) {
            if (grid[x + 1][y - 1] !== EMPTY) {
                return grid;
            }
        }
        if (y + 1 <= 9) {
            if (grid[x + 1][y + 1] !== EMPTY) {
                return grid;
            }
        }
    }

    /*todo continue: fix these cases*/
    if (x - 1 >= 0 && x + 1 <= 9
        && grid[x - 1][y] !== EMPTY
        && grid[x + 1][y] !== EMPTY) {
        return grid;
    }

    if (y - 1 >= 0 && y + 1 <= 9
        && grid[x][y - 1] !== EMPTY
        && grid[x][y + 1] !== EMPTY) {
        return grid;
    }

    const newRow = [...grid[x]];
    newRow[x][y] = INTACT_SHIP_PART;
    const newGrid = [...grid];
    newGrid[x] = newRow;
    return newGrid;
}

export default function (state = initialGrid, action) {
    switch (action.type) {
        case ADD_SHIP:
            return addShipPart(state, action.horizontalIndex,
                action.verticalIndex);
        default:
            return state;
    }
}
