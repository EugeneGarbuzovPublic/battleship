import { connect } from 'react-redux';
import Square from '../Square';
import { addShip } from '../../state/arrangement/actionCreators';

/*todo consider merging with Square*/
export default connect(
    (state, ownProps) => ({
        shipType: state.shipType,
        /*todo move grid from arrangement to global state*/
        state: state.grid[ownProps.horizontalIndex][ownProps.verticalIndex]
    }),
    (dispatch, ownProps) => ({
        onClick: () => dispatch(
            addShip(ownProps.horizontalIndex, ownProps.verticalIndex)
        )
    })
)(Square);
