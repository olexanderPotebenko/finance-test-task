import React from 'react';
import {connect} from 'react-redux';

import styles from './SettingPanel.module.css';
import AddList from './AddList/AddList.jsx';
import ChangeInterval from './ChangeInterval/ChangeInterval.jsx';
import {deleteIgnore} from '../../reducers/tickerReducer.js';

class SettingPanel extends React.Component {

  state = {
    editMode: false,
  }

  setEditMode = editMode => {
    this.setState({editMode});
  }

  render() { 

    let tickers = this.props.tickers.filter(ticker => 
      this.props.ignore.includes(ticker.ticker));

    return <div className={styles['change-block']}>
      <div className={styles['list-name']}>
        Watchlist
      </div>
      <button className={`${styles['add-ticker']} blue-button`}
        onBlur={(e) => this.setEditMode(false)}
        onClick={this.setEditMode.bind(this, true)}>
          <span className={styles['add-ticker-plus']}>+</span>
          <span className={styles['add-ticker-add']}>Add</span>
        { this.state.editMode && 
            <AddList
          setEditMode={this.setEditMode.bind(this, false)}
        deleteIgnore={this.props.deleteIgnore.bind(this)}
        tickers={tickers}/> }
      </button>
      <ChangeInterval />
    </div>
  };
};

const mapStateToProps = state => {
  return {
    tickers: state.tickersState.tickers,
    ignore: state.tickersState.ignore,
  };
};

export default connect(mapStateToProps, {deleteIgnore})(SettingPanel);

