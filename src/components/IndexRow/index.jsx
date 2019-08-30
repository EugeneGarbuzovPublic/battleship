import React from 'react';
import Index from '../Index';

export default function IndexRow(props) {
    const horizontalIndices =
        ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к'];

    const cells = new Array(10).fill(0).map((cellElement, cellIndex) => (
        <Index position={props.position} key={cellIndex}
               index={horizontalIndices[cellIndex]} />
    ));

    const sidePosition = props.position === 'top' ? 'top-side' : props.position;
    const side = <Index position={sidePosition} />;

    return (
        <div className="row">
            {side}
            {cells}
            {side}
        </div>
    );
}