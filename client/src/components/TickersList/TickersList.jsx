import React from 'react';
import {connect} from 'react-redux';

import styles from './TickersList.module.css';
import {rubiconsX, rubiconsArrowUp, rubiconsArrowDown} from '../../images/svg.js';
import {disallowTicker} from '../../reducers/tickerReducer.js';

const TickersList = props => {

  let tickers = [];
  tickers = props.tickers
    .map(ticker =>
      <Ticker key={Math.random()} {...ticker}
        disallowTicker={props.disallowTicker}/>);

  return <>
    {tickers}
  </>
}

const Ticker = props => {

  let clicked = false;

  const onButtonClick = () => {
    if(clicked) return;
    props.disallowTicker({ticker: props.ticker});
    clicked = true;
  };

  let arrow = props.direction === 'up'? rubiconsArrowUp: rubiconsArrowDown;
  let plusMinus = props.direction === 'up'? '+':'-';

  return <div className={styles.wrp}>
    <div className={`${styles['ticker-name']} ${styles[props.ticker]}`}>
      {props.ticker}
    </div>
    <div className={styles.exchange}>
      {props.exchange}
    </div>
    <div className={styles.price}>
      {'$' + props.price}
    </div>
    <div className={styles.change} direction={props.direction}>
      {`${plusMinus}${props.change}`}
    </div>
    <div className={styles['change-percent']}
      direction={props.direction}>
      <span>
        {arrow}
        {props.change_percent + '%'}
      </span>
    </div>
    <button className={styles['delete-button']}
      onClick={onButtonClick}>
      {rubiconsX}
    </button>

  </div>
};

const mapStateToProps = state => {
  return {
    tickers: state.tickersState.tickers,
  };
};

export default connect(mapStateToProps, {disallowTicker})(TickersList);
