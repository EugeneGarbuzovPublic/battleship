import shipTypes from '../../domain/shipTypes';
import {
    SET_SHIP_ORIENTATION,
    SET_SHIP_TYPE,
    SET_WAITING_STAGE,
    SHIP_ADDED
} from './actionTypes';
import squareStates from '../../domain/squareStates';
import shipOrientations from '../../domain/shipOrientations';
import stages from '../../domain/stages';


const initialState = {
    /*todo move game settings to domain*/
    stage: stages.ARRANGEMENT,
    shipType: shipTypes.reverse()[0],
    shipOrientation: shipOrientations.HORIZONTAL,
    grid: new Array(10).fill(new Array(10).fill(squareStates.EMPTY)),
    shipsToArrange: {
        1: 4,
        2: 3,
        3: 2,
        4: 1
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SHIP_TYPE:
            /*todo do not set state if not arrangement*/
            if (!shipTypes.includes(action.shipType)) {
                return state;
            }

            return {
                ...state,
                shipType: action.shipType
            };
        /*todo consider merging with SET_SHIP_TYPE*/
        case SET_SHIP_ORIENTATION:
            if (!(action.shipOrientation in shipOrientations)) {
                return state;
            }

            return {
                ...state,
                shipOrientation: action.shipOrientation
            };
        case SHIP_ADDED:
            return action.arrangementState;
        case SET_WAITING_STAGE:
            return {
                grid: state.grid,
                stage: stages.WAITING
            };
        default:
            return state;
    }
}
