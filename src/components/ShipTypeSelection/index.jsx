import React from 'react';
import shipTypes from '../../domain/shipTypes';
import ShipTypeOption from '../ShipTypeOption';

export default function ShipTypeSelection() {
    return (
        <div>
            {shipTypes.map(shipType => (
                <ShipTypeOption type={shipType} key={shipType} />
            ))}
        </div>
    );
}