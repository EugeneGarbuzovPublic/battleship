import shipOrientations from './shipOrientations';
import squareStates from './squareStates';

function getHorizontalShipPoint(ship, index) {
    return {
        x: ship.x + index,
        y: ship.y
    };
}

function getVerticalShipPoint(ship, index) {
    return {
        x: ship.x,
        y: ship.y + index
    };
}

function getShipPoints(ship, getShipPoint) {
    return new Array(ship.type).fill(0).map((element, index) =>
        getShipPoint(ship, index)
    );
}

function checkShipPoints(grid, shipPoints) {
    return shipPoints.every(point =>
        /*todo move game settings to domain*/
        point.x >= 0 && point.x <= 9 &&
        point.y >= 0 && point.y <= 9 &&
        grid[point.x][point.y] === squareStates.EMPTY
    );
}

function getHorizontalShipSurroundings(ship) {
    return [
        {
            x: ship.x - 1,
            y: ship.y
        },
        {
            x: ship.x + ship.type,
            y: ship.y
        },
        ...new Array(ship.type + 2).fill(0).map(
            (element, index) => ({
                x: ship.x - 1 + index,
                y: ship.y - 1
            })
        ),
        ...new Array(ship.type + 2).fill(0).map(
            (element, index) => ({
                x: ship.x - 1 + index,
                y: ship.y + 1
            })
        )
    ];
}

function getVerticalShipSurroundings(ship) {
    return [
        {
            x: ship.x,
            y: ship.y - 1
        },
        {
            x: ship.x,
            y: ship.y + ship.type
        },
        ...new Array(ship.type + 2).fill(0).map(
            (element, index) => ({
                x: ship.x - 1,
                y: ship.y - 1 + index
            })
        ),
        ...new Array(ship.type + 2).fill(0).map(
            (element, index) => ({
                x: ship.x + 1,
                y: ship.y - 1 + index
            })
        )
    ];
}

function checkSurroundings(grid, surroundings) {
    return surroundings.every(point =>
        /*todo move game settings to domain*/
        point.x < 0 || point.x > 9 ||
        point.y < 0 || point.y > 9 ||
        grid[point.x][point.y] === squareStates.EMPTY
    );
}

function addHorizontalShipToGrid(grid, ship) {
    const newGrid = [...grid];
    for (let i = 0; i < ship.type; i++) {
        const newColumn = [...grid[ship.x + i]];
        newColumn[ship.y] = squareStates.INTACT_SHIP_PART;
        newGrid[ship.x + i] = newColumn;
    }
    return newGrid;
}

function addVerticalShipToGrid(grid, ship) {
    const newGrid = [...grid];
    const newColumn = [...grid[ship.x]];
    for (let i = 0; i < ship.type; i++) {
        newColumn[ship.y + i] = squareStates.INTACT_SHIP_PART;
    }
    newGrid[ship.x] = newColumn;
    return newGrid;
}

function updateShipsToArrange(shipsToArrange, ship) {
    return {
        ...shipsToArrange,
        [ship.type]: shipsToArrange[ship.type] - 1
    };
}

function addSpecificShip(state, ship, algorithms) {
    const shipPoints = getShipPoints(ship, algorithms.getShipPoint);
    const areShipPointsAvailable = checkShipPoints(state.grid, shipPoints);
    if (!areShipPointsAvailable) {
        return state;
    }

    const surroundings = algorithms.getShipSurroundings(ship);
    const areSurroundingsAvailable =
        checkSurroundings(state.grid, surroundings);
    if (!areSurroundingsAvailable) {
        return state;
    }

    const grid = algorithms.addShipToGrid(state.grid, ship);
    const shipsToArrange = updateShipsToArrange(state.shipsToArrange, ship);
    return {
        ...state,
        grid,
        shipsToArrange
    };
}

export function addShip(state, ship) {
    if (state.shipsToArrange[ship.type] === 0) {
        return state;
    }

    switch (ship.orientation) {
        case shipOrientations.HORIZONTAL:
            const horizontalAlgorithms = {
                getShipPoint: getHorizontalShipPoint,
                getShipSurroundings: getHorizontalShipSurroundings,
                addShipToGrid: addHorizontalShipToGrid
            };
            return addSpecificShip(state, ship, horizontalAlgorithms);
        case shipOrientations.VERTICAL:
            const verticalAlgorithms = {
                getShipPoint: getVerticalShipPoint,
                getShipSurroundings: getVerticalShipSurroundings,
                addShipToGrid: addVerticalShipToGrid
            };
            return addSpecificShip(state, ship, verticalAlgorithms);
        default:
            return state;
    }
}
