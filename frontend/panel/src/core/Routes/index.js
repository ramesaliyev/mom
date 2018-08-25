import React from 'react';
import { Router } from "@reach/router";

import PageLoginOrRegister from 'pages/LoginOrRegister'; 

const Routes = props => (
  <Router>
    <PageLoginOrRegister path="/login-or-register" />
  </Router>
);

export default Routes;

