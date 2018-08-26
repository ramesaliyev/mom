import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from "react-router-dom";

import { isUserLoggedIn } from 'selectors/user';

class Boundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
      hasError: false
    };
  }
  
  componentDidCatch(error, info) {
    console.error(error, info)
    this.setState({ hasError: true });
  }

  render() {
    const { children, location, isUserLoggedIn } = this.props;
    const { hasError } = this.state;
    
    const entrancePagePathname = '/login-or-register';
    if (!isUserLoggedIn && location.pathname !== entrancePagePathname) {
      return (
        <Redirect to={entrancePagePathname} />
      );
    }

    if (hasError) {
      return (
        <div>Something bad happen. Reload the page.</div>
      );
    }

    return children;
  }
}

Boundary.propTypes = {
  children: PropTypes.any.isRequired,
};

const mapDispatchToProps = ({
});

const mapStateToProps = state => ({
  isUserLoggedIn: isUserLoggedIn(state)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Boundary)
);