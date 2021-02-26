/* eslint-disable react/jsx-props-no-spreading */
import { Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './web/css/index.scss';
import App from './App';
import routes from './routes';

ReactDOM.render(
  <BrowserRouter>
    <Route>
      {(props) => <App {...props} routes={routes} />}
    </Route>
  </BrowserRouter>,
  document.getElementById('root'),
);
