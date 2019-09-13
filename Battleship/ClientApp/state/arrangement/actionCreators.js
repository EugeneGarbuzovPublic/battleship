import {
    ADD_SHIP,
    SET_MAX_PLAYERS,
    SET_SHIP_ORIENTATION,
    SET_SHIP_TYPE,
    SET_WAITING_STAGE,
    SHIP_ADDED
} from './actionTypes';

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

export function shipAdded(arrangementState) {
    return {
        type: SHIP_ADDED,
        arrangementState
    };
}

export function setWaitingStage() {
    return {
        type: SET_WAITING_STAGE
    };
}

export function setMaxPlayers() {
    return {
        type: SET_MAX_PLAYERS
    };
}
