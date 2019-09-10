import React from 'react';
import shipTypes from '../../domain/shipTypes';
import ShipTypeOption from '../ShipTypeOption';

export default function ShipTypeSelection() {
    return (
        /*todo show options only if there are ships available*/
        <div>
            {shipTypes.map(shipType => (
                <ShipTypeOption type={shipType} key={shipType} />
            ))}
        </div>
    );
}