import React from 'react';
import './styles.css';
import Row from '../Row';
import IndexRow from '../IndexRow';

export default function OwnGrid() {
    const rows = new Array(10).fill(0).map((rowElement, rowIndex) => {
        return (
            <Row key={rowIndex} index={rowIndex + 1} />
        );
    });

    return (
        <div className="grid">
            <IndexRow position="top" />
            {rows}
            <IndexRow position="bottom" />
        </div>
    );
}