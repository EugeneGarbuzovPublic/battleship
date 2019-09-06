import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);