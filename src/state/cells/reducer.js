import { SET_TIME } from './actionTypes';

export default function (state = {}, action) {
    switch (action.type) {
        case SET_TIME:
            return {
                time: new Date().toLocaleString()
            };
        default:
            return state;
    }
}