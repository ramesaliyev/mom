import React from 'react';
import { Switch, Route } from 'react-router-dom'

import PageLoginOrRegister from 'pages/LoginOrRegister'; 
import PageCreateMathJob from 'pages/CreateMathJob'; 

const Routes = props => (
  <Switch>
    <Route exact path="/" component={PageCreateMathJob}/>
    <Route path="/login-or-register" component={PageLoginOrRegister}/>
  </Switch>
);

export default Routes;

