import { ADD_SHIP_PART } from './actionTypes';

/*todo consider removing*/
export function addShipPart(horizontalIndex, verticalIndex) {
    return {
        type: ADD_SHIP_PART,
        horizontalIndex,
        verticalIndex
    };
}