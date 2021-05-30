import React from 'react';
import styles from './ChangeInterval.module.css';
import {appApi} from '../../../api/api.js';

class ChangeInterval extends React.Component {

  componentDidMount () {
    this.getInterval();
  }

  state = {
    isFetching: false,
    interval: undefined,
    possibleIntervals: [],
  }

  setIsFetching = isFetching => this.setState({isFetching});
  setInterval = interval => this.setState({interval});
  setPossibleIntervals = possibleIntervals => this.setState({possibleIntervals});

  getInterval = () => {
    this.setIsFetching(true);
    appApi.getInterval({interval: this.state.interval})
      .then(response => {
        this.setInterval(response.interval);
        this.setPossibleIntervals(response.possibleIntervals);
        this.setIsFetching(false);
      });
  }

  onSelect = (e) => {
    this.setIsFetching(true);
    appApi.setInterval({interval: +e.currentTarget.value})
      .then(response => {
        if(response.status_code === 0) {
          this.setInterval(response.interval);
        };
        this.setIsFetching(false);
      });
  }

  render() {

    let options = this.state.possibleIntervals
      .map(interval => <option key={Math.random()} value={interval}>{`${interval/1000}s`}</option>);

    return <div className={styles.wrp}>
      <label htmlFor='change-interval' 
        style={ {color: this.state.isFetching? '#666':'inherit' } }>
        Choose update interval:
      </label>
      {
        this.state.isFetching
          && <div className={'dot-flashing'}> </div>
        || <select id='change-interval' className={'blue-button'} 
          onChange={this.onSelect}
          value={this.state.interval}
          disabled={this.state.disabled}>
          {options}
        </select>
      }
      </div>
  }
}

export default ChangeInterval;
