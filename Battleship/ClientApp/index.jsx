import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './state/store';

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
