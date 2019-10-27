import { connect } from 'react-redux';
import Square from '../Square';
import { shoot } from '../../state/arrangement/actionCreators';
import { EMPTY, HIT, MISS } from '../../domain/squareStates';

function isAlreadyShot(horizontalIndex, verticalIndex, shots) {
    return shots.some(ownMiss =>
        ownMiss.x === horizontalIndex && ownMiss.y === verticalIndex);
}

function getSquareState(horizontalIndex, verticalIndex, state) {
    const isMiss = isAlreadyShot(
        horizontalIndex,
        verticalIndex,
        state.ownMisses
    );
    if (isMiss) {
        return MISS;
    }

    const isHit = isAlreadyShot(
        horizontalIndex,
        verticalIndex,
        state.ownHits
    );
    if (isHit) {
        return HIT;
    }

    return EMPTY;
}

/*todo battleship consider merging with Square*/
/*todo battleship react-redux hooks*/
export default connect(
    (state, ownProps) => ({
        state: getSquareState(
            ownProps.horizontalIndex,
            ownProps.verticalIndex,
            state
        )
    }),
    (dispatch, ownProps) => ({
        onClick: () => dispatch(
            shoot(ownProps.horizontalIndex, ownProps.verticalIndex)
        )
    })
)(Square);
