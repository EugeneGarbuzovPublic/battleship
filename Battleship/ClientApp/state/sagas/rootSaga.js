import { ADD_SHIP, SHOOT } from '../arrangement/actionTypes';
import { takeEvery } from 'redux-saga/effects';
import arrangeShipsSaga from './arrangeShipsSaga';
import shotsSaga from './shotsSaga';

/*todo battleship remove 'Saga' suffix from saga files*/

export default function* rootSaga() {
    yield takeEvery(ADD_SHIP, arrangeShipsSaga);
    yield takeEvery(SHOOT, shotsSaga);
}
