import { call, put, select } from 'redux-saga/effects';
import connection from '../../services/connection';
import { BATTLE } from '../../domain/stages';
import { applyOwnShotResult } from '../arrangement/actionCreators';

export default function* (action) {
    const { isTurn, stage } = yield select();

    if (!isTurn && stage !== BATTLE) {
        return;
    }

    // todo battleship unify coordinate names
    let { horizontalIndex: x, verticalIndex: y } = action;
    const result = yield call([connection, 'invoke'], 'shoot', x, y);
    yield put(applyOwnShotResult(result));
}
