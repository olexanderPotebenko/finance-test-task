import React from 'react';
import {connect} from 'react-redux';

import styles from './Main.module.css';
import SettingPanel from './SettingPanel/SettingPanel.jsx';
import TickersList from './TickersList/TickersList.jsx';
import {disallowTicker} from '../reducers/tickerReducer.js';

class Main extends React.Component {

  render () {

    return <div className={styles.wrp}>
      <SettingPanel />
      <TickersList />
    </div>
  };
};

export default Main;
