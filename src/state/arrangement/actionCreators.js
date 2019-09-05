import { SET_SHIP_TYPE } from './actionTypes';

export function setShipType(shipType) {
    return {
        type: SET_SHIP_TYPE,
        shipType
    };
}