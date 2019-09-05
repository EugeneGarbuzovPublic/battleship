import shipTypes from '../../domain/shipTypes';
import { SET_SHIP_TYPE } from './actionTypes';


const initialState = {
    shipType: shipTypes.reverse()[0]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SHIP_TYPE:
            /*todo check*/
            /*todo log*/
            /*todo do not set state if not arrangement*/
            if (!shipTypes.includes(action.shipType)) {
                return state;
            }

            return {
                ...state,
                shipType: action.shipType
            };
        default:
            return state;
    }
}