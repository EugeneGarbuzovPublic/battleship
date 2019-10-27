import shipOrientations from './shipOrientations';

function getHorizontalShipPoint(shipData, index) {
    return {
        x: shipData.x + index,
        y: shipData.y
    };
}

function getVerticalShipPoint(shipData, index) {
    return {
        x: shipData.x,
        y: shipData.y + index
    };
}

function getShipPoints(shipData, getShipPoint) {
    return new Array(shipData.type).fill(0).map((element, index) =>
        getShipPoint(shipData, index)
    );
}

function isPointEmpty(point, ships) {
    return ships.every(ship =>
        ship.every(shipSquare =>
            shipSquare.x !== point.x || shipSquare.y !== point.y)
    );
}

function checkShipPoints(ships, shipPoints) {
    return shipPoints.every(point =>
        /*todo battleship move game settings to domain*/
        point.x >= 0 && point.x <= 9 &&
        point.y >= 0 && point.y <= 9 &&
        isPointEmpty(point, ships)
    );
}

function getHorizontalShipSurroundings(shipData) {
    return [
        {
            x: shipData.x - 1,
            y: shipData.y
        },
        {
            x: shipData.x + shipData.type,
            y: shipData.y
        },
        ...new Array(shipData.type + 2).fill(0).map(
            (element, index) => ({
                x: shipData.x - 1 + index,
                y: shipData.y - 1
            })
        ),
        ...new Array(shipData.type + 2).fill(0).map(
            (element, index) => ({
                x: shipData.x - 1 + index,
                y: shipData.y + 1
            })
        )
    ];
}

function getVerticalShipSurroundings(shipData) {
    return [
        {
            x: shipData.x,
            y: shipData.y - 1
        },
        {
            x: shipData.x,
            y: shipData.y + shipData.type
        },
        ...new Array(shipData.type + 2).fill(0).map(
            (element, index) => ({
                x: shipData.x - 1,
                y: shipData.y - 1 + index
            })
        ),
        ...new Array(shipData.type + 2).fill(0).map(
            (element, index) => ({
                x: shipData.x + 1,
                y: shipData.y - 1 + index
            })
        )
    ];
}

function checkSurroundings(ships, surroundings) {
    return surroundings.every(point =>
        /*todo battleship move game settings to domain*/
        point.x < 0 || point.x > 9 ||
        point.y < 0 || point.y > 9 ||
        isPointEmpty(point, ships)
    );
}

function updateShipsToArrange(shipsToArrange, shipData) {
    return {
        ...shipsToArrange,
        [shipData.type]: shipsToArrange[shipData.type] - 1
    };
}

function addSpecificShip(state, shipData, algorithms) {
    const shipPoints = getShipPoints(shipData, algorithms.getShipPoint);
    const areShipPointsAvailable = checkShipPoints(state.ownShips, shipPoints);
    if (!areShipPointsAvailable) {
        return state;
    }

    const surroundings = algorithms.getShipSurroundings(shipData);
    const areSurroundingsAvailable =
        checkSurroundings(state.ownShips, surroundings);
    if (!areSurroundingsAvailable) {
        return state;
    }

    const ownShips = [...state.ownShips, shipPoints];
    const shipsToArrange = updateShipsToArrange(state.shipsToArrange, shipData);
    return {
        ...state,
        ownShips,
        shipsToArrange
    };
}

export function addShip(state, shipData) {
    if (state.shipsToArrange[shipData.type] === 0) {
        return state;
    }

    switch (shipData.orientation) {
        case shipOrientations.HORIZONTAL:
            const horizontalAlgorithms = {
                getShipPoint: getHorizontalShipPoint,
                getShipSurroundings: getHorizontalShipSurroundings
            };
            return addSpecificShip(state, shipData, horizontalAlgorithms);
        case shipOrientations.VERTICAL:
            const verticalAlgorithms = {
                getShipPoint: getVerticalShipPoint,
                getShipSurroundings: getVerticalShipSurroundings
            };
            return addSpecificShip(state, shipData, verticalAlgorithms);
        default:
            return state;
    }
}
