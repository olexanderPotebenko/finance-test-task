import React from 'react';
import ReactDOM, {render, unmountComponentAtNode} from 'react-dom';
import {create} from 'react-test-renderer';
import {TickersListTest, Ticker} from './TickersList.jsx';
import {disallowTicker} from '../../reducers/tickerReducer.js';
import {Provider} from 'react-redux';
import store from '../../store/store.js';

const tickers =  [
  {
    ticker : "GME",
    exchange : "NASDAQ",
    price :  168.69,
    change :  3.74,
    change_percent :  0.71,
    dividend :  0.25,
    yield :  1.74,
    direction :  'up' ,
    last_trade_time : "2021-05-30T07: 47: 29.000Z",
  },
  {
    ticker: "INDEX",
    exchange: "NASDAQ",
    price: 169.11,
    change: 1.40,
    change_percent: 0.78,
    dividend: 0.55,
    yield: 1.67,
    direction: "up",
    last_trade_time: "2021-05-30T08:19:36.000Z",
  },
];

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const ticker = <Ticker disallowTicker={disallowTicker} {...tickers[0]}/>;
describe('Ticker component', () => {
  test('The ticker should be rendered without errors', () => {
    render(ticker, container);
  });

  test('before you press the ticker button, state.clicked == true', () => {
    const tickerTR = create(ticker);
    const button = tickerTR.root.findByType('button');
    button.props.onClick();
    expect(tickerTR.getInstance().state.clicked).toBe(true);
  });
});

const tickersList = <TickersListTest tickers={[...tickers]} disallowTicker={disallowTicker}/>;
describe('TickersList', () => {
  test('The TickersList should be rendered without errors', () => {
    render(tickersList, container);
  });
  test('The TickersList contain 2 tickers', () => {
    expect(create(tickersList).root.findAllByType(Ticker).length).toBe(2);
  });
});

