import { call, put, select } from 'redux-saga/effects';
import { addShip as addShipToGameState } from '../../domain/operations';
import { setWaitingStage, shipAdded } from '../arrangement/actionCreators';
import shipTypes from '../../domain/shipTypes';
import connection from '../../services/connection';
import { getShipCells } from '../../utils';

/*todo move most logic to reducer*/
function* addShip(state, action) {
    const gameState = {
        grid: state.grid,
        shipsToArrange: state.shipsToArrange
    };
    const ship = {
        type: state.shipType,
        orientation: state.shipOrientation,
        x: action.horizontalIndex,
        y: action.verticalIndex
    };
    return yield call(addShipToGameState, gameState, ship);
}

function* updateState(state, newGameState) {
    const newArrangementState = {
        ...state,
        ...newGameState
    };
    const addShipAction = yield call(shipAdded, newArrangementState);
    yield put(addShipAction);
    return newArrangementState;
}

export default function* (action) {
    const state = yield select();
    const newGameState = yield addShip(state, action);
    const newArrangementState = yield updateState(state, newGameState);

    const shipsToArrange = newArrangementState.shipsToArrange;
    const noMoreShipsToArrange =
        shipTypes.every(type => shipsToArrange[type] === 0);
    if (noMoreShipsToArrange) {
        yield put(setWaitingStage());
        const shipCells = getShipCells(newArrangementState.grid);
        yield call([connection, 'send'], 'arrangeGrid', shipCells);
    }
}
