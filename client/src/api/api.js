import * as axios from 'axios';
import {host, port} from '../config.js';

 
const instance = axios.create({
  baseURL: `http://${host}:${port}/`,
});

export const appApi = {
  getInterval () {
    return instance.get('interval')
      .then(response => response.data);
  },
  setInterval (options) {
    return instance.put('interval', {interval: options.interval})
      .then(response => response.data);
  },
};

export const tickerApi = {
  getTickers () {
    return instance.get(`tickers`)
      .then(response => response.data);
  },
  allowTicker (options) {
    return instance.put(`tickers`, {ticker: options.ticker})
      .then(response => response.data);
  },
  disallowTicker (options) {
    return instance.delete(`tickers`, {data: {ticker: options.ticker}})
      .then(response => response.data);
  },
};
