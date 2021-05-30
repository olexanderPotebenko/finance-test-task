import { io } from "socket.io-client";
import {host, port} from '../config.js';
import {setTickers} from '../reducers/tickerReducer.js';

export const socketConnect = () => ({ type: 'WS-CONNECT'});
export const socketDisconnect = () => ({ type: 'WS-DISCONNECT'});

const socketMiddleware = () => {

  let socket = null;

  const addHeandlers = store => {
    socket.on('ticker', function(response) {
      store.dispatch(setTickers(response));
    });
    socket.on("disconnect", () => {
      store.dispatch(socketConnect());
    });
  }

  return store => next => action => {
    switch (action.type) {
      case 'WS-CONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = io.connect(`http://${host}:${port}`);
        socket.emit('start');
        addHeandlers(store);
        break;
      case 'WS-DISCONNECT':
        if (socket !== null) {
          socket.close();
        };
        socket = null;
        console.log('websocket closed');
        break;
      default:
        console.log('the next action:', action);
        return next(action);
    };
  };
};

export default socketMiddleware();
