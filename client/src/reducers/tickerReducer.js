const SET_TICKERS = 'SET-TICKERS';
const ADD_IGNORE = 'ADD-IGNORE';
const DELETE_IGNORE = 'DELETE-IGNORE';

const initial = {
  tickers: [],
  ignore: ['MSFT', 'TSLA', 'AMC'],
}

const tickerReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_TICKERS:
      console.log(action.tickers); //delete
      return {
        ...state,
        tickers: action.tickers,
      };
    case ADD_IGNORE:
      return {
        ...state,
        ignore: [...state.ignore, action.ticker],
      };
    case DELETE_IGNORE:
      return {
        ...state,
        ignore: state.ignore.filter(ticker => ticker != action.ticker),
      };
    default:
      return state;
  };
};

export const setTickers = tickers => ({type: SET_TICKERS, tickers});
export const addIgnore = ticker => ({type: ADD_IGNORE, ticker});
export const deleteIgnore = ticker => ({type: DELETE_IGNORE, ticker});

export default tickerReducer;
