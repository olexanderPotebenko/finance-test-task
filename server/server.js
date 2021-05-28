'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data

let FETCH_INTERVAL = 3000;
const possibleIntervals = [1000, 3000, 4000, 5000, 7000];
const PORT = process.env.PORT || 4000;

const tickers = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
  'GME', // GameStop
  'INDEX', //Dow Jones
  'AMC', //
];

let myTickers = [ 'GME', 'INDEX', 'AMC', ];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(tickers = []) {
  return tickers.map(ticker => getQuote(ticker));
}

function getQuote (ticker) {
  const quote = {
    ticker,
    exchange: 'NASDAQ',
    price: randomValue(100, 300, 2),
    change: randomValue(0, 20, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    direction: Math.random() > .1? 'up': 'down',
    last_trade_time: utcDate(),
  };
  return quote;
}

function trackTickers(socket) {
  // run the first time immediately
  socket.emit('ticker', getQuotes(myTickers));

  // every N seconds
  const timer = setInterval(function() {
    socket.emit('ticker', getQuotes(myTickers));
  }, FETCH_INTERVAL);

  socket.on('disconnect', function() {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
app.use(bodyParser.json()) // for parsing application/json

const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  }
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

//tickers
app.get('/tickers', function(req, res) {
  res.send({tickers: getQuotes(tickers)});
});

app.put('/tickers', function(req, res) {

  let message = '';
  if(!(req.body && req.body.ticker)
    || !tickers.includes(req.body.ticker) ) {
    message = 'unrelated ticker';  
    res.send({status_code: 1, message});
  } else if(myTickers.includes(req.body.ticker)) {
    message = 'ticker already allowed';
    res.send({status_code: 1, message});
  } else {
    message = `ticker ${req.body.ticker} is allow`;
    res.send({status_code: 0, ticker: getQuote(req.body.ticker)});
    myTickers.push(req.body.ticker);
  };
  console.log(message);
});

app.delete('/tickers', function(req, res) {

  let message = '';
  if(!(req.body && req.body.ticker)
    || !tickers.includes(req.body.ticker) ) {
    message = 'unrelated ticker';  
    res.send({status_code: 1, message});
  } else if(!myTickers.includes(req.body.ticker)) {
    message = 'ticker was not allowed';
    res.send({status_code: 1, message});
  } else {
    message = `ticker ${req.body.ticker} is disallow`;
    res.send({status_code: 0});
    myTickers = myTickers.filter(ticker => ticker != req.body.ticker);
  };
  console.log(message);
});
//interval
app.get('/interval', function(req, res) {
  res.send({interval: FETCH_INTERVAL});
});

app.put('/interval', function(req, res) {
  let message = '';
  if(!(req.body && req.body.interval)
    || !possibleIntervals.includes(req.body.interval)) {
    message = 'unrelated interval';
    res.send({status_code: 1, message});
  } else if(req.body.interval === FETCH_INTERVAL) {
    message = 'the interval is already set';
    res.send({status_code: 1, message});
  } else {
    message = `the new value for the interval is ${req.body.interval/1000} seconds`;
    res.send({status_code: 0, message});
  };
  console.log(message);
});

socketServer.on('connection', (socket) => {
  socket.on('start', () => {
    trackTickers(socket);
  });
  socket.on('getTickers', () => {
    socket.emit('getTickers', getQuotes(myTickers));
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
