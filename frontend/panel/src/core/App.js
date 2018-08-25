import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import { configureStore } from './Store';
import Layout from './Layout';
import Routes from './Routes';

const App = props => (
  <Provider store={configureStore()}>
    <Fragment>
      <CssBaseline />
      <Layout>
        <Routes />
      </Layout>
    </Fragment>
  </Provider>
);

export default App;
