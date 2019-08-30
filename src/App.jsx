import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setTime } from './state/cells/actionCreators';

/*todo global tests*/
/*todo global ESLint*/
/*todo global redux-saga*/

/*todo global react-router*/

function App(props) {

    useEffect(() => {
        const intervalID = setInterval(props.setTime, 2000);

        return () => {
            clearInterval(intervalID);
        };
    }, []);

    return (
        <div className="App">
            <h1>{props.time}</h1>
        </div>
    );
}

const ConnectedApp = connect(
    state => ({
        time: state.cells.time
    }),
    dispatch => ({
        setTime: () => dispatch(setTime())
    })
)(App);

export default hot(ConnectedApp);