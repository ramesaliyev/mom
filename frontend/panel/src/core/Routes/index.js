import React from 'react';
import { Router } from "@reach/router";

import PageRegister from 'pages/Register'; 
import PageLogin from 'pages/Login'; 
import PageForgotPassword from 'pages/ForgotPassword'; 

const Routes = props => (
  <Router>
    <PageRegister path="/register" />
    <PageLogin path="/login" />
    <PageForgotPassword path="/forgot-password" />
  </Router>
);

export default Routes;

