import React from 'react';
import { connect } from 'react-redux';
import strings from '../../strings';
import { BATTLE } from '../../domain/stages';

function TurnIndicator(props) {
    if (props.stage !== BATTLE) {
        return null;
    }

    const messages = new Map();
    messages.set(true, strings.itsYourTurn);
    messages.set(false, strings.itsOpponentsTurn);

    const message = messages.get(props.isTurn);

    return (
        <div>
            {message}
        </div>
    );
}

export default connect(
    state => ({
        stage: state.stage,
        isTurn: state.isTurn
    })
)(TurnIndicator);
