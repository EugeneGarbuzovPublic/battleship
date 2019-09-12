import React from 'react';
import './styles.css';
import classNames from 'classnames';

export default function Index(props) {
    const knownPositions = [
        'top',
        'top-side',
        'left',
        'right',
        'bottom'
    ];

    const className = classNames({
        index: true,
        [`index-${props.position}`]: knownPositions.includes(props.position)
    });

    return (
        <div className={className}>{props.index}</div>
    );
}
