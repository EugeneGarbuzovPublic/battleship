import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import OwnGrid from '../OwnGrid';
import './styles.css';
import { ARRANGEMENT, MAX_PLAYERS, BATTLE } from '../../domain/stages';
import ShipTypeSelection from '../ShipTypeSelection';
import ShipOrientationSelection from '../ShipOrientationSelection';
import Notification from '../Notification';
import TurnIndicator from '../TurnIndicator';
import EnemyGrid from '../EnemyGrid';
import { addShip, setShipType } from '../../state/arrangement/actionCreators';

/*todo battleship global ErrorBoundary*/
/*todo battleship global tests*/
/*todo battleship global react-router*/
/*todo battleship global logging*/
/*todo battleship global ImmutableJS*/
/*todo battleship global propTypes*/
/*todo battleship global GraphQL*/
/*todo battleship global a11y*/

/*todo battleship lint on commit (git hooks)*/
/*todo battleship React.memo*/
/*todo battleship highlight squares on hover*/
/*todo battleship auto arrangement*/

function App(props) {
    /*todo battleship add clear/undo buttons during arrangement*/

    useEffect(() => {
        /*todo battleship fix connection when one player is already waiting*/
        props.setTestArrangement();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    }),
    dispatch => ({
        setTestArrangement: () => {
            dispatch(addShip(0, 0));
            dispatch(setShipType(3));
            dispatch(addShip(0, 2));
            dispatch(addShip(0, 4));
            dispatch(setShipType(2));
            dispatch(addShip(0, 6));
            dispatch(addShip(0, 8));
            dispatch(addShip(5, 0));
            dispatch(setShipType(1));
            dispatch(addShip(5, 2));
            dispatch(addShip(5, 4));
            dispatch(addShip(5, 6));
        }
    })
)(App);

export default ConnectedApp;
