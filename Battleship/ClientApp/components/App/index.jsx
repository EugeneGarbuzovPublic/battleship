import React from 'react';
import { connect } from 'react-redux';
import OwnGrid from '../OwnGrid';
import './styles.css';
import { ARRANGEMENT, MAX_PLAYERS, BATTLE } from '../../domain/stages';
import ShipTypeSelection from '../ShipTypeSelection';
import ShipOrientationSelection from '../ShipOrientationSelection';
import Notification from '../Notification';
import TurnIndicator from '../TurnIndicator';
import EnemyGrid from '../EnemyGrid';

/*todo battleship global ErrorBoundary*/
/*todo battleship global tests*/
/*todo battleship global react-router*/
/*todo battleship global logging*/
/*todo battleship global ImmutableJS*/
/*todo battleship global propTypes*/
/*todo battleship global GraphQL*/

/*todo battleship lint on commit*/
/*todo battleship React.memo*/
/*todo battleship highlight squares on hover*/
/*todo battleship auto arrangement*/

function App(props) {
    /*todo battleship add clear/undo buttons during arrangement*/

    return (
        <div>
            {/*todo battleship prevent grid from being shown
             * before max players number message*/}
            <Notification />
            <TurnIndicator />
            {props.stage !== MAX_PLAYERS && (
                /*todo battleship extract component to file*/
                <div className="grid-place">
                    <OwnGrid />
                    {props.stage === BATTLE && (
                        <EnemyGrid />
                    )}
                </div>
            )}
            {/*todo battleship optimize conditions*/}
            {props.stage === ARRANGEMENT && (
                <>
                    <ShipTypeSelection />
                    {/*todo battleship replace constant*/}
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
