import React from 'react';
import { connect } from 'react-redux';
import { setShipType } from '../../state/arrangement/actionCreators';

function ShipTypeOption(props) {
    return (
        <div>
            <input type="radio" id={`type${props.type}`}
                   onChange={() => props.setShipType(props.type)}
                   value={props.type} checked={props.shipType === props.type} />
            <label htmlFor={`type${props.type}`}>
                {/*todo localizable*/}
                {props.type}
            </label>
        </div>
    );
}

export default connect(
    state => ({
        shipType: state.arrangement.shipType
    }),
    dispatch => ({
        setShipType: type => dispatch(setShipType(type))
    })
)(ShipTypeOption);