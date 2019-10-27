import { connect } from 'react-redux';
import Square from '../Square';
import { addShip } from '../../state/arrangement/actionCreators';
import { EMPTY, HIT, INTACT_SHIP_PART, MISS } from '../../domain/squareStates';

function getSquareState(horizontalIndex, verticalIndex, state) {
    const isOccupied = state.ownShips.some(
        ship => ship.some(
            square => square.x === horizontalIndex
                && square.y === verticalIndex));
    const wasShot = state.enemyShots.some(
        enemyShot => enemyShot.x === horizontalIndex
            && enemyShot.y === verticalIndex);

    return isOccupied
        ? wasShot
            ? HIT
            : INTACT_SHIP_PART
        : wasShot
            ? MISS
            : EMPTY;
}

/*todo battleship consider merging with Square*/
export default connect(
    (state, ownProps) => ({
        shipType: state.shipType,
        state: getSquareState(
            ownProps.horizontalIndex,
            ownProps.verticalIndex,
            state
        )
    }),
    (dispatch, ownProps) => ({
        onClick: () => dispatch(
            addShip(ownProps.horizontalIndex, ownProps.verticalIndex)
        )
    })
)(Square);
