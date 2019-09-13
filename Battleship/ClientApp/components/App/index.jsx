import React from 'react';
import { connect } from 'react-redux';
import OwnGrid from '../OwnGrid';
import './styles.css';
import { ARRANGEMENT, MAX_PLAYERS } from '../../domain/stages';
import ShipTypeSelection from '../ShipTypeSelection';
import ShipOrientationSelection from '../ShipOrientationSelection';
import Notification from '../Notification';

/*todo global ErrorBoundary*/
/*todo global tests*/
/*todo global react-router*/
/*todo global logging*/
/*todo global ImmutableJS*/
/*todo global propTypes*/
/*todo global GraphQL*/

/*todo lint on commit*/
/*todo React.memo*/
/*todo highlight squares on hover*/
/*todo auto arrangement*/

function App(props) {
    /*todo add clear/undo buttons during arrangement*/

    return (
        <div>
            {/*todo prevent grid from showing
             * before max players number message*/}
            <Notification />
            {props.stage !== MAX_PLAYERS && (
                /*todo extract component to file*/
                <div className="grid-place">
                    <OwnGrid />
                </div>
            )}
            {/*todo optimize conditions*/}
            {props.stage === ARRANGEMENT && (
                <>
                    <ShipTypeSelection />
                    {/*todo replace constant*/}
                    {props.shipType !== 1 && <ShipOrientationSelection />}
                </>
            )}
        </div>
    );
}

const ConnectedApp = connect(
    state => ({
        stage: state.stage,
        shipType: state.shipType
    })
)(App);

export default ConnectedApp;
