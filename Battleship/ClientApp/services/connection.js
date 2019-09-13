import { HubConnectionBuilder } from '@aspnet/signalr';
import { setMaxPlayers } from '../state/arrangement/actionCreators';
import store from '../state/store';

const connection = new HubConnectionBuilder().withUrl('/game').build();

connection.on('maxPlayers', () => {
    store.dispatch(setMaxPlayers());
});

connection.start();

export default connection;
