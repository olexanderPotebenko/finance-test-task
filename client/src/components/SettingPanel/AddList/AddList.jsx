import React from 'react';

import styles from './AddList.module.css';
import {rubiconsX, rubiconsArrowUp, rubiconsArrowDown} from '../../../images/svg.js';

const AddList = props => {

  const selectTicker = (ticker) => {
    props.deleteIgnore(ticker);
  };


  let tickers = props.tickers.map(ticker => 
    <div className={styles.item} onClick={() => selectTicker(ticker.ticker)}>
      <div className={styles['item-left']}>
        <div className={styles['item-name']}>
          {ticker.ticker}
        </div>
        <div className={styles['exchange']}>
          {ticker.exchange}
        </div>
      </div>
      <div className={styles['item-price']}>
        {'$' + ticker.price}
      </div>
      <div className={'change-percent'} direction={ticker.direction}>
        <span>
          {ticker.direction === 'up' && rubiconsArrowUp || rubiconsArrowDown}
          {ticker.change_percent + '%'}
        </span>
      </div>
    </div>);

  return <div className={styles.wrp} onblur={() => alert()}>
    <div className={styles.head}>
      <span>
        {tickers.length && 'Choose from the list' || "You can't add anything else"}
      </span>
      <button className={styles['close-button']}>
        {rubiconsX}
      </button>
    </div>
    <div className={styles.list}>
      {tickers}
    </div>
  </div>
}

export default AddList;
