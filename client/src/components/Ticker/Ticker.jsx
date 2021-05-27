import React from 'react';

import styles from './Ticker.module.css';
import {rubiconsX, rubiconsArrowUp, rubiconsArrowDown} from '../../images/svg.js';


const Ticker = props => {

  let arrow = props.direction === 'up'? rubiconsArrowUp: rubiconsArrowDown;
  let plusMinus = props.direction === 'up'? '+':'-';

  return <div className={styles.wrp}>
    <div className={'ticker-name ' + props.ticker + ' ' + styles['ticker-name']}>
      {props.ticker}
    </div>
    <div className={'exchange ' + styles.exchange}>
      {props.exchange}
    </div>
    <div className={'price ' + styles.price}>
      {'$' + props.price}
    </div>
    <div className={'change ' + styles.change} direction={props.direction}>
      {`${plusMinus}${props.change}`}
    </div>
    <div className={'change-percent ' + styles['change-percent']} 
      direction={props.direction}>
      <span>
        {arrow}
        {props.change_percent + '%'}
      </span>
    </div>
    <button className={styles['delete-button']} 
      onClick={() => props.addIgnore(props.ticker)}>
      {rubiconsX}
    </button>

  </div>
};

export default Ticker;
