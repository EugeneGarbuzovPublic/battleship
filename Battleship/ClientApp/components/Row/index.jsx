import React from 'react';
import './styles.css';
import Index from '../Index';

export default function Row(props) {
    const { Square } = props;

    const cells = new Array(10).fill(0).map((cellElement, cellIndex) => (
        <Square key={cellIndex} disabled={props.disabled}
                horizontalIndex={cellIndex} verticalIndex={props.index} />
    ));

    const displayedIndex = props.index + 1;

    return (
        <div className="row">
            <Index position="left" index={displayedIndex} />
            {cells}
            <Index position="right" index={displayedIndex} />
        </div>
    );
}
