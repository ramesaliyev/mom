import React from 'react';
import { Switch, Route } from 'react-router-dom'

import PageLoginOrRegister from 'pages/LoginOrRegister';
import PageCreateMathJob from 'pages/CreateMathJob';
import ListOwnJobs from 'pages/ListOwnJobs';

const Routes = props => (
  <Switch>
    <Route exact path="/" component={PageCreateMathJob}/>
    <Route path="/login-or-register" component={PageLoginOrRegister}/>
    <Route path="/jobs" component={ListOwnJobs}/>
  </Switch>
);

export default Routes;
