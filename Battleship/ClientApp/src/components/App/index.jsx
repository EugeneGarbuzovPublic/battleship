import React from 'react';
import { connect } from 'react-redux';
import OwnGrid from '../OwnGrid';
import './styles.css';
import stages from '../../domain/stages';
import ShipTypeSelection from '../ShipTypeSelection';
import ShipOrientationSelection from '../ShipOrientationSelection';

/*todo global tests*/
/*todo global ESLint, VS support*/
/*todo global redux-saga*/
/*todo global react-router*/
/*todo global logging*/
/*todo global ImmutableJS*/
/*todo global propTypes*/

/*todo React.memo*/
/*todo highlight squares on hover*/
/*todo auto arrangement*/

function App(props) {
    /*todo add clear/undo buttons during arrangement*/

    /*todo extract component to file*/
    const OpponentGridPlace = (
        <div className="grid-place">
            <OwnGrid />
        </div>
    );

    return (
        <div>
            {/*todo extract component to file*/}
            <div className="grid-place">
                <OwnGrid />
            </div>
            {/*todo optimize conditions*/}
            {props.stage !== stages.ARRANGEMENT && <OpponentGridPlace />}
            {props.stage === stages.ARRANGEMENT && (
                <>
                    <ShipTypeSelection />
                    {props.shipType !== 1 && <ShipOrientationSelection />}
                </>
            )}
        </div>
    );
}

const ConnectedApp = connect(
    state => ({
        stage: state.stage,
        shipType: state.arrangement.shipType
    })
)(App);

export default ConnectedApp;