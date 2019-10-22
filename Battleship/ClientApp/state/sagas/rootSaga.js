import { ADD_SHIP, SHOOT } from '../arrangement/actionTypes';
import { takeEvery } from 'redux-saga/effects';
import addShipSaga from './addShipSaga';
import shotsSaga from './shotsSaga';

/*todo battleship remove 'Saga' suffix from saga files*/

export default function* rootSaga() {
    yield takeEvery(ADD_SHIP, addShipSaga);
    yield takeEvery(SHOOT, shotsSaga);
}
