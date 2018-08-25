import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from "@reach/router"

import { isUserLoggedIn } from 'selectors/user';

class Boundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };

    this.checkLogin(props);
  }
  
  componentWillReceiveProps(nextProps) {
    this.checkLogin(nextProps);
  }
  
  checkLogin({ isUserLoggedIn }) {
    !isUserLoggedIn && navigate('/login-or-register');
  }

  componentDidCatch(error, info) {
    console.error(error, info)
    this.setState({ hasError: true });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

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

export default (
  connect(mapStateToProps, mapDispatchToProps)(Boundary)
);