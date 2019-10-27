import shipTypes from '../../domain/shipTypes';
import {
    ADD_SHIP,
    SET_BATTLE,
    SET_MAX_PLAYERS,
    SET_SHIP_ORIENTATION,
    SET_SHIP_TYPE,
    SET_WAITING_STAGE,
    SHOOT
} from './actionTypes';
import shipOrientations from '../../domain/shipOrientations';
import { ARRANGEMENT, BATTLE, MAX_PLAYERS, WAITING } from '../../domain/stages';
import strings from '../../strings';
import { addShip } from '../../domain/operations';


const initialState = {
    /*todo battleship move game settings to domain*/
    /*todo battleship initialize all state properties*/
    stage: ARRANGEMENT,
    shipType: shipTypes.reverse()[0],
    shipOrientation: shipOrientations.HORIZONTAL,
    shipsToArrange: {
        1: 4,
        2: 3,
        3: 2,
        4: 1
    },
    ownShips: [],
    enemyShots: [],
    ownMisses: [],
    ownHits: [],
    isTurn: false,
    notification: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_SHIP_TYPE:
            /*todo battleship do not set state if not arrangement*/
            if (!shipTypes.includes(action.shipType)) {
                return state;
            }

            return {
                ...state,
                shipType: action.shipType
            };
            /*todo battleship consider merging with SET_SHIP_TYPE*/
        case SET_SHIP_ORIENTATION:
            if (!(action.shipOrientation in shipOrientations)) {
                return state;
            }

            return {
                ...state,
                shipOrientation: action.shipOrientation
            };
        case ADD_SHIP:
            if (state.stage !== ARRANGEMENT) {
                return state;
            }

            const gameState = {
                ownShips: state.ownShips,
                shipsToArrange: state.shipsToArrange
            };
            const shipData = {
                type: state.shipType,
                orientation: state.shipOrientation,
                x: action.horizontalIndex,
                y: action.verticalIndex
            };
            return {
                ...state,
                ...addShip(gameState, shipData)
            };
        case SET_WAITING_STAGE:
            return {
                ...state,
                ownShips: state.ownShips,
                stage: WAITING,
                notification: strings.waitingForOpponent
            };
        case SET_MAX_PLAYERS:
            return {
                ...state,
                stage: MAX_PLAYERS,
                notification: strings.maxPlayers
            };
        case SET_BATTLE:
            return {
                ...state,
                notification: null,
                stage: BATTLE,
                ownShips: state.ownShips,
                enemyShots: [],
                ownMisses: [],
                ownHits: [],
                isTurn: action.isTurn
            };
        case SHOOT:
            if (!state.isTurn && state.stage !== BATTLE) {
                return state;
            }



            return state;
        default:
            return state;
    }
}
