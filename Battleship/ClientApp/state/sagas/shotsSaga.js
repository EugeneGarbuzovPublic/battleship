import { call, select } from 'redux-saga/effects';
import connection from '../../services/connection';
import { EMPTY } from '../../domain/squareStates';

export default function* (action) {
    const { enemyGrid } = yield select();
    // todo battleship unify coordinate names
    let { horizontalIndex: x, verticalIndex: y } = action;
    if (enemyGrid[x][y] !== EMPTY) {
        return;
    }
    yield call([connection, 'send'], 'shoot', x, y);
}
