import React from 'react';
import {connect} from 'react-redux';

import styles from './Main.module.css';
import {addIgnore} from '../reducers/tickerReducer.js';
import Ticker from './Ticker/Ticker.jsx';
import SettingPanel from './SettingPanel/SettingPanel.jsx';

class Main extends React.Component {

  render () {

    let tickers = [];
    tickers = this.props.tickers
      .filter(ticker => !this.props.ignore.includes(ticker.ticker))
      .map((ticker, index) => 
        <Ticker key={index} {...ticker} addIgnore={this.props.addIgnore}/>);

    return <div className={styles.wrp}>
      <SettingPanel />
      <div className={styles['watch-list']}>
        {tickers}
      </div>
    </div>
  };
};

const mapStateToProps = state => {
  return {
    tickers: state.tickersState.tickers,
    ignore: state.tickersState.ignore,
  };
};

export default connect(mapStateToProps, {addIgnore})(Main);
