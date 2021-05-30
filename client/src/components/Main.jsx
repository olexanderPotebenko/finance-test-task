import React from 'react';

import styles from './Main.module.css';
import SettingPanel from './SettingPanel/SettingPanel.jsx';
import TickersList from './TickersList/TickersList.jsx';

class Main extends React.Component {

  render () {

    return <div className={styles.wrp}>
      <SettingPanel />
      <TickersList />
    </div>
  };
};

export default Main;
