import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './state/rootReducer';
import createSagaMiddleware from 'redux-saga';
import App from './components/App';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './state/sagas/rootSaga';

const composeEnhancers = composeWithDevTools({});

const sagaMiddleware = createSagaMiddleware();

/*todo add redux-devtools to applyMiddleware*/
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

/*todo write it in a better way*/
const StoredApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

const HotReplacedApp = hot(StoredApp);

ReactDOM.render(
    <HotReplacedApp />,
    document.getElementsByTagName('main')[0]
);
