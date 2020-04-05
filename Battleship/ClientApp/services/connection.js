import { HubConnectionBuilder } from '@aspnet/signalr';
import {
    applyEnemyShotResult,
    setBattle,
    setMaxPlayers
} from '../state/arrangement/actionCreators';
import store from '../state/store';

const connection = new HubConnectionBuilder().withUrl('/game').build();

connection.on('maxPlayers', () => {
    store.dispatch(setMaxPlayers());
});

connection.on('shipsArranged', isTurn => {
    store.dispatch(setBattle(isTurn));
});

connection.on('shot', result => {
    store.dispatch(applyEnemyShotResult(result));
});

connection.start();

export default connection;
