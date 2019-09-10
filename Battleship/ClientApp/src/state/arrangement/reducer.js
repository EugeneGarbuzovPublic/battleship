import shipTypes from '../../domain/shipTypes';
import { SET_SHIP_ORIENTATION, SET_SHIP_TYPE } from './actionTypes';
import squareStates from '../../domain/squareStates';
import { ADD_SHIP } from './actionTypes';
import shipOrientations from '../../domain/shipOrientations';
import { addShip } from '../../domain/operations';


const initialState = {
    /*todo move game settings to domain*/
    shipType: shipTypes.reverse()[0],
    shipOrientation: shipOrientations.HORIZONTAL,
    grid: new Array(10).fill(new Array(10).fill(squareStates.EMPTY)),
    shipsToArrange: {
        1: 4,
        2: 3,
        3: 2,
        4: 1,
    }
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
        /*todo consider merging with SET_SHIP_TYPE*/
        case SET_SHIP_ORIENTATION:
            if (!(action.shipOrientation in shipOrientations)) {
                return state;
            }

            return {
                ...state,
                shipOrientation: action.shipOrientation
            };
        case ADD_SHIP:
            const gameState = {
                grid: state.grid,
                shipsToArrange: state.shipsToArrange
            };
            const ship = {
                type: state.shipType,
                orientation: state.shipOrientation,
                x: action.horizontalIndex,
                y: action.verticalIndex
            };
            const newGameState = addShip(gameState, ship);
            return {
                ...state,
                ...newGameState
            };
        default:
            return state;
    }
}