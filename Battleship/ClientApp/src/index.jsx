import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './state/rootReducer';
import App from './components/App';
import { devToolsEnhancer } from 'redux-devtools-extension';

/*todo add redux-devtools to applyMiddleware*/
const store = createStore(
    rootReducer,
    devToolsEnhancer()
);

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