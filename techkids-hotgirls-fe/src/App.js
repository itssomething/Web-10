import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import './App.css';

import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Header />
        <div>Body should go here</div>
      </div>
    );
  }
}

export default App;
