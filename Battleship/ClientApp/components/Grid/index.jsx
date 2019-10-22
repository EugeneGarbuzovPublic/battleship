import React from 'react';
import './styles.css';
import Row from '../Row';
import IndexRow from '../IndexRow';

export default function Grid(props) {
    const rows = new Array(10).fill(0).map((rowElement, rowIndex) => (
        <Row key={rowIndex} index={rowIndex} disabled={props.disabled}
             Square={props.Square} />
    ));

    return (
        <div className="grid">
            <IndexRow position="top" />
            {rows}
            <IndexRow position="bottom" />
        </div>
    );
}
