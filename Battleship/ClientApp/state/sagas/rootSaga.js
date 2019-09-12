import { ADD_SHIP } from '../arrangement/actionTypes';
import { takeEvery } from 'redux-saga/effects';
import addShipSaga from './addShipSaga';

export default function* rootSaga() {
    yield takeEvery(ADD_SHIP, addShipSaga);
}
