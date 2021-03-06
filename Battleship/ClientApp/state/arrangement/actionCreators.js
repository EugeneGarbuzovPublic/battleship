import {
    ADD_SHIP,
    SET_BATTLE,
    SET_MAX_PLAYERS,
    SET_SHIP_ORIENTATION,
    SET_SHIP_TYPE,
    SET_WAITING_STAGE
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

export function setBattle(isTurn) {
    return {
        type: SET_BATTLE,
        isTurn
    };
}
