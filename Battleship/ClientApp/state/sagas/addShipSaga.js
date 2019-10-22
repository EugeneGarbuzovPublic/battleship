import { call, put, select } from 'redux-saga/effects';
import { setWaitingStage } from '../arrangement/actionCreators';
import shipTypes from '../../domain/shipTypes';
import connection from '../../services/connection';
import getShipCells from '../../utils/getShipCells';
import { ARRANGEMENT } from '../../domain/stages';

export default function*() {
    const state = yield select();

    if (state.stage !== ARRANGEMENT) {
        return;
    }

    const { shipsToArrange } = state;
    const noMoreShipsToArrange =
        shipTypes.every(type => shipsToArrange[type] === 0);
    if (noMoreShipsToArrange) {
        yield put(setWaitingStage());
        const shipCells = getShipCells(state.grid);
        yield call([connection, 'send'], 'arrangeGrid', shipCells);
    }
}
