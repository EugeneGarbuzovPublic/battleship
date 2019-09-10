import React from 'react';
import './styles.css';
import Row from '../Row';
import IndexRow from '../IndexRow';

export default function OwnGrid(props) {
    const rows = new Array(10).fill(0).map((rowElement, rowIndex) => {
        return (
            /*todo consider removing disabled prop*/
            /*todo consider implementing disabled passing via context*/
            <Row key={rowIndex} index={rowIndex} disabled={props.disabled} />
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