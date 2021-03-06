import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FixturesIndex from './containers/Fixtures/index';
import { Provider } from 'react-redux';
import {store} from './lib/store_setup';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header container">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Today's Matches</h1>
          </header>
          <div className="container">
            <FixturesIndex/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
