import React, {
  PureComponent,
} from 'react';
import {
  BrowserRouter as Router, Route,
} from 'react-router-dom';
import MainLayout from './MainLayout';

class App extends PureComponent {
  render () {
    return (
      <div id='app'>
        <Router>
          <Route component={MainLayout} path='/' />
        </Router>
      </div>
    );
  }
}

export default App;
