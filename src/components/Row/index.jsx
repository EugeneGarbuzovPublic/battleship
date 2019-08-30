import React from 'react';
import './styles.css';
import Index from '../Index';
import Square from '../Square';

export default function Row(props) {
    const cells = new Array(10).fill(0).map((cellElement, cellIndex) => (
        <Square key={cellIndex} />
    ));

    return (
        <div className="row">
            <Index position="left" index={props.index} />
            {cells}
            <Index position="right" index={props.index} />
        </div>
    );
}