import React from 'react';
import { connect } from 'react-redux';
import { setShipType } from '../../state/arrangement/actionCreators';

/*todo remove margin between radiobutton and label*/
function ShipTypeOption(props) {
    const id = `type_${props.type}`;

    return (
        <div>
            <input type="radio" id={id}
                   onChange={() => props.setShipType(props.type)}
                   value={props.type} checked={props.type === props.shipType} />
            <label htmlFor={id}>
                {/*todo battleship localizable*/}
                {props.type}
            </label>
            {/*todo battleship remaining ships number*/}
        </div>
    );
}

export default connect(
    state => ({
        shipType: state.shipType
    }),
    dispatch => ({
        setShipType: type => dispatch(setShipType(type))
    })
)(ShipTypeOption);
