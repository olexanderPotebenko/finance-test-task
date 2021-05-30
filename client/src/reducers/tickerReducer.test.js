import tickerReducer, {addTicker, deleteTicker} from './tickerReducer.js';

//deleteTicker
it ('the length of the ticker array should decrease by one when deleted', () => {
  let state = {
    tickers: [
      {ticker: 'AMZ'},
      {ticker: 'FB'},
    ],
  };
  state = tickerReducer(state, deleteTicker('FB'));
  expect(state.tickers.length).toBe(1);
});

it ('the length of the ticker array should not decrease if an incorrect ticker is specified', () => {
  let state = {
    tickers: [
      {ticker: 'AMZ'},
      {ticker: 'FB'},
    ],
  };
  state = tickerReducer(state, deleteTicker('GOOGL'));
  expect(state.tickers.length).toBe(2);
});

//addTicker
it ('the length of the ticker array should increace by one when added', () => {
  let state = {
    tickers: [
      {ticker: 'AMZ'},
      {ticker: 'FB'},
    ],
  };
  state = tickerReducer(state, addTicker('GOOGL'));
  expect(state.tickers.length).toBe(3);
});

it ('the length of the ticker array should not increase if such a ticker is already in the array', () => {
  let state = {
    tickers: [
      {ticker: 'AMZ'},
      {ticker: 'FB'},
    ],
  };
  state = tickerReducer(state, addTicker({ticker: 'FB'}));

  expect(state.tickers.length).toBe(2);
});
