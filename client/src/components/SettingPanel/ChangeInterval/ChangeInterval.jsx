import React from 'react';
import styles from './ChangeInterval.module.css';

const ChangeInterval = props => {

  return <div className={styles.wrp}>
    <label for='change-interval'>Choose update interval:</label>
    <select id='change-interval' className={'blue-button'}>
      <option value={1}>1s</option>
      <option value={3}>3s</option>
      <option value={5}>5s</option>
      <option value={7}>7s</option>
    </select>
  </div>
}

export default ChangeInterval;
