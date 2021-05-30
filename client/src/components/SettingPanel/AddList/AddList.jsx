import React from 'react';

import styles from './AddList.module.css';
import {rubiconsX, rubiconsArrowUp, rubiconsArrowDown} from '../../../images/svg.js';
import {tickerApi} from '../../../api/api.js';

class AddList extends React.Component {

  componentDidMount () {
    this.setState({isFetching: true});
    tickerApi.getTickers({})
      .then(response => {
        this.setState({
          isFetching: false,
          tickers: response.tickers,
        });
      });
  }

  state = {
    isFetching: false,
    tickers: [],
  }

  render () {

    const onSelectTicker = (ticker) => {
      this.props.allowTicker({ticker});
      this.props.setEditMode(false);
    };

    let tickers = this.state.tickers
      .filter(ticker => !this.props.tickers
        .find(myticker => myticker.ticker === ticker.ticker))
      .map(ticker => <Ticker {...ticker} key={Math.random()} onSelectTicker={onSelectTicker.bind(this, ticker.ticker)}/>);

    let phrase = this.state.isFetching?'Get available tickers..':
      (tickers.length?'Choose from the list':"You can't add anything else");

    return <div className={styles.wrp}>
      <div className={styles.head}>
        <span>
          {phrase}
        </span>
        <button className={styles['close-button']}>
          {rubiconsX}
        </button>
      </div>
      <div className={styles.list}>
        {tickers}
      </div>
    </div>
  };
};

const Ticker = props => {

  return <div className={styles.ticker} key={Math.random()*1000}
    onClick={props.onSelectTicker}>
    <div className={styles['ticker-left']}>
      <div className={styles['ticker-name']}>
        {props.ticker}
      </div>
      <div className={styles.exchange}>
        {props.exchange}
      </div>
    </div>
    <div className={styles['ticker-price']}>
      {'$' + props.price}
    </div>
    <div className={styles['change-percent']} direction={props.direction}>
      <span>
        {props.direction === 'up' && rubiconsArrowUp || rubiconsArrowDown}
        {props.change_percent + '%'}
      </span>
    </div>
  </div>
};

export default AddList;
