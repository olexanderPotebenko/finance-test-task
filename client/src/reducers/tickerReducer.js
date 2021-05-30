import {tickerApi} from '../api/api.js';

const SET_TICKERS = 'SET-TICKERS';
const ADD_TICKER = 'ADD-TICKER';
const DELETE_TICKER = 'DELETE-TICKER';

export const setTickers = tickers => ({type: SET_TICKERS, tickers});
export const addTicker = ticker => ({type: ADD_TICKER, ticker});
export const deleteTicker = tickerName => ({type: DELETE_TICKER, tickerName});

const initial = {
  tickers: [],
}

const tickerReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_TICKERS:
      return {
        ...state,
        tickers: action.tickers,
      };
    case ADD_TICKER:
      if (state.tickers.find(ticker=> ticker.ticker === action.ticker.ticker))
        return state;
      else return {
        ...state,
        tickers: [...state.tickers, action.ticker],
      };
    case DELETE_TICKER: 
      return {
        ...state,
        tickers: state.tickers.filter(ticker => ticker.ticker !== action.tickerName),
      }
    default:
      return state;
  };
};

export const allowTicker = options => dispatch => {
  tickerApi.allowTicker(options)
    .then (response => {
      if (response.status_code === 0) {
        console.log(`Ticker ${options.ticker} success allowed!`);
        dispatch(addTicker(response.ticker));
      };
    });
};

export const disallowTicker = options => dispatch => {
  tickerApi.disallowTicker(options)
    .then (response => {
      if (response.status_code === 0) {
        console.log(`Ticker ${options.ticker} success disallowed`);
        dispatch(deleteTicker(options.ticker));
      };
    });
};

export default tickerReducer;
