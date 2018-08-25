import React from 'react';
import { Provider } from 'react-redux';

import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import { configureStore } from './Store';
import Boundary from './Boundary';
import Layout from './Layout';
import Routes from './Routes';

const App = props => (
  <Provider store={configureStore()}>
    <Boundary>
      <CssBaseline />
      <Layout>
        <Routes />
      </Layout>
    </Boundary>
  </Provider>
);

export default App;
