import React, { Fragment } from 'react';

import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import Layout from './Layout';
import Routes from './Routes';

const App = props => (
  <Fragment>
    <CssBaseline />
    <Layout>
      <Routes />
    </Layout>
  </Fragment>
);

export default App;
