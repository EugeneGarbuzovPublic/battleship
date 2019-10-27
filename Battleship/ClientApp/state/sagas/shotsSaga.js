import { call } from 'redux-saga/effects';
import connection from '../../services/connection';

export default function* (action) {
    // todo battleship unify coordinate names
    let { horizontalIndex: x, verticalIndex: y } = action;
    yield call([connection, 'invoke'], 'shoot', x, y);
}
