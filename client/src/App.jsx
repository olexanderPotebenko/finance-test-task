import React from 'react';
import {connect} from 'react-redux';

import './App.css';
import {socketConnect} from './middleware/socketMiddleware.js';
import Main from './components/Main.jsx';

class App extends React.Component {

  componentDidMount () {
    this.props.socketConnect();
  }

  render () {
    return (
      <div className="App">
        <Main />
      </div>
    );
  };
};

export default connect(() => {}, {socketConnect})(App);
