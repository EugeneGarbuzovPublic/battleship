import React from 'react';
import './styles.css';

export default function Index(props) {
    let classes = "index";
    switch (props.position) {
        case 'top':
        case 'top-side':
        case 'left':
        case 'right':
        case 'bottom':
            classes += ` index-${props.position}`;
            break;
    }

    return (
        <div className={classes}>{props.index}</div>
    );
}