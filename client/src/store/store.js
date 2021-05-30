import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

import socketMiddleware from '../middleware/socketMiddleware.js';
import tickerReducer from '../reducers/tickerReducer.js';


let reducers = combineReducers({
  tickersState: tickerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware, socketMiddleware)));

export default store;

