import React from 'react';
import { connect } from 'react-redux';

function Notification(props) {
    if (props.message) {
        return (
            <div>
                {props.message}
            </div>
        );
    } else {
        return null;
    }
}

export default connect(
    state => ({
        message: state.notification
    })
)(Notification);
