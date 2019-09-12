import React from 'react';
import { connect } from 'react-redux';
import { setShipOrientation } from '../../state/arrangement/actionCreators';
import shipOrientations from '../../domain/shipOrientations';
import strings from '../../strings';

const labelKeys = {
    [shipOrientations.HORIZONTAL]: 'horizontally',
    [shipOrientations.VERTICAL]: 'vertically'
};

function ShipOrientationOption(props) {
    const id = `orientation_${props.orientation}`;
    const labelKey = labelKeys[props.orientation];

    return (
        <div>
            <input type="radio" id={id}
                   onChange={() => props.setShipOrientation(props.orientation)}
                   value={props.orientation}
                   checked={props.orientation === props.shipOrientation} />
            <label htmlFor={id}>
                {strings[labelKey]}
            </label>
        </div>
    );
}

export default connect(
    state => ({
        shipOrientation: state.shipOrientation
    }),
    dispatch => ({
        setShipOrientation:
            orientation => dispatch(setShipOrientation(orientation))
    })
)(ShipOrientationOption);
