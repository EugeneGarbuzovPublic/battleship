import React from 'react';
import { connect } from 'react-redux';
import Square from '../Square';
import { addShip } from '../../state/arrangement/actionCreators';

/*todo consider merging with Square*/
export default connect(
    (state, ownProps) => ({
        shipType: state.arrangement.shipType,
        /*todo move grid from arrangement to global state*/
        state: state.arrangement.grid[ownProps.horizontalIndex]
            [ownProps.verticalIndex]
    }),
    (dispatch, ownProps) => ({
        onClick: () => dispatch(
            addShip(ownProps.horizontalIndex, ownProps.verticalIndex)
        )
    })
)(Square);
