import React from 'react';
import ShipOrientationOption from '../ShipOrientationOption';
import shipOrientations from '../../domain/shipOrientations';
import './styles.css';

/*todo merge with ShipTypeSelection*/
export default function ShipOrientationSelection() {
    return (
        /*todo BEM*/
        <div className="ship-orientation-selection">
            {Object.values(shipOrientations).map(shipOrientation => (
                <ShipOrientationOption orientation={shipOrientation}
                                       key={shipOrientation} />
            ))}
        </div>
    );
}