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

export class Ticker extends React.Component {

  state = {
    clicked: false,
  }

    onButtonClick = () => {
      if(this.state.clicked) return;
      this.props.disallowTicker({ticker: this.props.ticker});
      this.setState({clicked: true});
    };

  render() {

    let arrow = this.props.direction === 'up'? rubiconsArrowUp: rubiconsArrowDown;
    let plusMinus = this.props.direction === 'up'? '+':'-';

    return <div className={styles.wrp}>
      <div className={`${styles['ticker-name']} ${styles[this.props.ticker]}`}>
        {this.props.ticker}
      </div>
      <div className={styles.exchange}>
        {this.props.exchange}
      </div>
      <div className={styles.price}>
        {'$' + this.props.price}
      </div>
      <div className={styles.change} direction={this.props.direction}>
        {`${plusMinus}${this.props.change}`}
      </div>
      <div className={styles['change-percent']}
        direction={this.props.direction}>
        <span>
          {arrow}
          {this.props.change_percent + '%'}
        </span>
      </div>
      <button className={styles['delete-button']}
        onClick={this.onButtonClick}>
        {rubiconsX}
      </button>

    </div>
  };
};

const mapStateToProps = state => {
  return {
    tickers: state.tickersState.tickers,
  };
};

export default connect(mapStateToProps, {disallowTicker})(TickersList);
export const TickersListTest = TickersList;
