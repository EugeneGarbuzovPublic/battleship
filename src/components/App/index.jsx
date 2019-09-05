import { hot } from 'react-hot-loader/root';
import React/*, { useEffect }*/ from 'react';
import { connect } from 'react-redux';
import OwnGrid from '../OwnGrid';
import './styles.css';
import stages from '../../domain/stages';
import ShipTypeSelection from '../ShipTypeSelection';

/*todo global tests*/
/*todo global ESLint*/
/*todo global redux-saga*/
/*todo global react-router*/
/*todo global logging*/

/*todo global propTypes*/

/*todo React.memo*/
/*todo highlight squares on hover*/

function App(props) {

    /*useEffect(() => {
        const intervalID = setInterval(props.setTime, 2000);

        return () => {
            clearInterval(intervalID);
        };
    }, []);*/

    /*todo add clear/undo buttons during arrangement*/

    /*todo extract component to file*/
    const EnemyGridPlace = (
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
            {props.stage !== stages.ARRANGEMENT && <EnemyGridPlace />}
            {props.stage === stages.ARRANGEMENT && <ShipTypeSelection />}
        </div>
    );
}

const ConnectedApp = connect(
    state => ({
        stage: state.stage
    })
)(App);

export default hot(ConnectedApp);