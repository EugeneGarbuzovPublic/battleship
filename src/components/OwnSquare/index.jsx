import React from 'react';
import { connect } from 'react-redux';
import Square from '../Square';
import { addShipPart } from '../../state/own/actionCreators';

export default connect(
    state => ({
        shipType: state.arrangement.shipType
    }),
    (dispatch, ownProps) => ({
        onClick: () => dispatch(
            addShipPart(ownProps.horizontalIndex, ownProps.verticalIndex)
        )
    })
)(Square);