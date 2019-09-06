import { SET_SHIP_TYPE, ADD_SHIP, SET_SHIP_ORIENTATION } from './actionTypes';

export function setShipType(shipType) {
    return {
        type: SET_SHIP_TYPE,
        shipType
    };
}

export function setShipOrientation(shipOrientation) {
    return {
        type: SET_SHIP_ORIENTATION,
        shipOrientation
    };
}

export function addShip(horizontalIndex, verticalIndex) {
    return {
        type: ADD_SHIP,
        horizontalIndex,
        verticalIndex
    };
}