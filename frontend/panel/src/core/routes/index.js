import React from 'react';
import { Switch, Route } from 'react-router-dom'

import PageLoginOrRegister from 'pages/LoginOrRegister'; 
import PageHome from 'pages/Home'; 

const Routes = props => (
  <Switch>
    <Route exact path="/" component={PageHome}/>
    <Route path="/login-or-register" component={PageLoginOrRegister}/>
  </Switch>
);

export default Routes;

