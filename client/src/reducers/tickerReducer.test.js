import tickerReducer, {addTicker, deleteTicker} from './tickerReducer.js';

const state = {
  tickers: [
    {ticker: 'AMZ'},
    {ticker: 'FB'},
  ],
};

//deleteTicker
it ('the length of the ticker array should decrease by one when deleted', () => {
  let result = tickerReducer(state, deleteTicker('FB')).tickers.length;
  expect(result).toBe(1);
});

it ('the length of the ticker array should not decrease if an incorrect ticker is specified', () => {
  let result = tickerReducer(state, deleteTicker('GOOGL')).tickers.length;
  expect(result).toBe(2);
});

//addTicker
it ('the length of the ticker array should increace by one when added', () => {
  let result = tickerReducer(state, addTicker('GOOGL')).tickers.length;
  expect(result).toBe(3);
});

it ('the length of the ticker array should not increase if such a ticker is already in the array', () => {
  let result = tickerReducer(state, addTicker({ticker: 'FB'})).tickers.length;
  expect(result).toBe(2);
});
