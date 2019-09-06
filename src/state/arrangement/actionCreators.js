import { SET_SHIP_TYPE } from './actionTypes';
import { ADD_SHIP } from './actionTypes';

export function setShipType(shipType) {
    return {
        type: SET_SHIP_TYPE,
        shipType
    };
}

export function addShip(horizontalIndex, verticalIndex) {
    return {
        type: ADD_SHIP,
        horizontalIndex,
        verticalIndex
    };
}