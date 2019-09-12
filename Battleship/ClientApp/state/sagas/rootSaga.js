import { ADD_SHIP } from '../arrangement/actionTypes';
import { takeEvery } from 'redux-saga/effects';
import arrangementSaga from './arrangementSaga';

export default function* rootSaga() {
    yield takeEvery(ADD_SHIP, arrangementSaga);
}
