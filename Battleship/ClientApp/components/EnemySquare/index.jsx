import { connect } from 'react-redux';
import Square from '../Square';
import { shoot } from '../../state/arrangement/actionCreators';

/*todo battleship consider merging with Square*/
export default connect(
    (state, ownProps) => ({
        state: state.enemyGrid[ownProps.horizontalIndex][ownProps.verticalIndex]
    }),
    (dispatch, ownProps) => ({
        onClick: () => dispatch(
            shoot(ownProps.horizontalIndex, ownProps.verticalIndex)
        )
    })
)(Square);
