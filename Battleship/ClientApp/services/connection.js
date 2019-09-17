import { HubConnectionBuilder } from '@aspnet/signalr';
import { setBattle, setMaxPlayers } from '../state/arrangement/actionCreators';
import store from '../state/store';

const connection = new HubConnectionBuilder().withUrl('/game').build();

connection.on('maxPlayers', () => {
    store.dispatch(setMaxPlayers());
});

connection.on('shipsArranged', isTurn => {
    store.dispatch(setBattle(isTurn));
});

connection.start();

export default connection;
