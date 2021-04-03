import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route, BrowserRouter,
} from 'react-router-dom';
import './web/css/index.scss';
import App from './App';
import Routes from './Routes';

ReactDOM.render(
  <BrowserRouter>
    <Route>
      {(props) => {
        return <App {...props} routes={Routes} />;
      }}
    </Route>
  </BrowserRouter>,
  document.getElementById('root'),
);
