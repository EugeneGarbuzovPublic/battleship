import React from 'react';
import './styles.css';
import classNames from 'classnames';

export default function Square(props) {
    const classNamesString = classNames({
        square: true,
        /*todo remove disabled*/
        disabled: props.disabled
    });

    const onClick = () => {
        if (props.disabled) {
            return;
        }

        props.onClick();
        console.log(props.shipType);
    };

    return (
        <div className={classNamesString} onClick={onClick} />
    );
}