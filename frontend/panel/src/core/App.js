import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline';

import { actionAppInitialized } from 'actions/app/init';
import './App.css';
import { configureStore } from './store';
import Boundary from './boundary';
import Layout from './layout';
import Routes from './routes';

const store = configureStore();
store.dispatch(actionAppInitialized());

const App = props => (
  <Provider store={store}>
    <BrowserRouter>
      <Boundary>
        <CssBaseline />
        <Layout>
          <Routes />
        </Layout>
      </Boundary>
    </BrowserRouter>
  </Provider>
);

export default App;
