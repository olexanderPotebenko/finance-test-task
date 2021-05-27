import {createStore, combineReducers, applyMiddleware} from 'redux';
import socketMiddleware from '../middleware/socketMiddleware.js';
import tickerReducer from '../reducers/tickerReducer.js';

import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
  tickersState: tickerReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware, socketMiddleware));

export default store;

