import React from 'react';
import './styles.css';
import classNames from 'classnames';
import { INTACT_SHIP_PART } from '../../domain/squareStates';

export default function Square(props) {
    const className = classNames({
        square: true,
        'intact-ship-part': props.state === INTACT_SHIP_PART,
        /*todo remove disabled*/
        disabled: props.disabled
    });

    const onClick = () => {
        if (props.disabled) {
            return;
        }

        props.onClick();
    };

    return (
        <div className={className} onClick={onClick} />
    );
}
