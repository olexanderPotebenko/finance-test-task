import { io } from "socket.io-client";
import {host, port} from '../config.js';
import {setTickers} from '../reducers/tickerReducer.js';

export const socketConnect = () => ({ type: 'WS_CONNECT'});

export const socketConnecting = () => ({ type: 'WS_CONNECTING'});
export const socketConnected = () => ({ type: 'WS_CONNECTED'});
export const socketDisconnect = () => ({ type: 'WS_DISCONNECT'});
export const socketDisconnected = () => ({ type: 'WS_DISCONNECTED'});

const socketMiddleware = () => {

  let socket = null;

  const addHeandlers = store => {
    socket.on('ticker', function(response) {
      store.dispatch(setTickers(response));
      console.log(`Response: \n${response}`);
    });
    socket.on("disconnect", () => {
      store.dispatch(socketConnect());
    });
  }

  return store => next => action => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }

        socket = io.connect(`http://${host}:${port}`);
        socket.emit('start');

        addHeandlers(store);

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        };
        socket = null;
        console.log('websocket closed');
        break;
      case 'NEW_MESSAGE':
        console.log('sending a message', action.msg);
        socket.send(JSON.stringify({ command: 'NEW_MESSAGE', message: action.msg }));
        break;
      default:
        console.log('the next action:', action);
        return next(action);
    };
  };
};

export default socketMiddleware();
