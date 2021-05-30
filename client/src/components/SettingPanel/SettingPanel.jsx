import React from 'react';
import {connect} from 'react-redux';

import styles from './SettingPanel.module.css';
import AddList from './AddList/AddList.jsx';
import ChangeInterval from './ChangeInterval/ChangeInterval.jsx';
import {allowTicker} from '../../reducers/tickerReducer.js';

class SettingPanel extends React.Component {

  state = {
    editMode: false,
  }

  setEditMode = editMode => this.setState({editMode})

  onButtonClick = () => {
    if(!this.state.editMode)
      this.setEditMode(true);
  }
  render() {

    return <div className={styles['change-block']}>
      <div className={styles['list-name']}>
        Watchlist
      </div>
      <button className={`${styles['add-ticker']} blue-button`}
        onBlur={(e) => this.setEditMode(false)}
        onClick={this.onButtonClick}>
          <span className={styles['add-ticker-plus']}>+</span>
          <span className={styles['add-ticker-add']}>Add</span>
        { this.state.editMode &&
            <AddList
          setEditMode={this.setEditMode.bind(this)}
        allowTicker={this.props.allowTicker.bind(this)}
        tickers={this.props.tickers}/> }
      </button>
      <ChangeInterval />
    </div>
  };
};

const mapStateToProps = state => {
  return {
    tickers: state.tickersState.tickers,
  };
};

export default connect(mapStateToProps, {allowTicker})(SettingPanel);

