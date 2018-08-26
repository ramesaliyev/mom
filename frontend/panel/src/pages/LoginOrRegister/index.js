import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

import { isUserLoggedIn } from 'selectors/user';
import LoginScreen from './login';
import RegisterScreen from './register';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '200px'
  }
});

class LoginOrRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      loading: props.isUserLoggedIn
    }

    this.showSpinner = this.showSpinner.bind(this);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  showSpinner() {
    this.setState({
      loading: true
    })
  }

  render() {
    const { classes, isUserLoggedIn } = this.props;
    const { value, loading } = this.state;

    if (isUserLoggedIn) {
      return (
        <Redirect to="/"/>
      );
    }

    if (loading) {
      return (
        <main className={classes.spinner}>
          <CircularProgress size={70} />
        </main>
      );
    }

    return (
      <div className={classes.root}>
        <Paper>
          <Tabs
            value={value}
            onChange={this.handleChange}
            fullWidth={true}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Paper>

        {value === 0 &&
          <TabContainer>
            <LoginScreen onLoading={this.showSpinner} />
          </TabContainer>
        }

        {value === 1 &&
          <TabContainer>
            <RegisterScreen onLoading={this.showSpinner} />
          </TabContainer>
        }
      </div>
    );
  }
}

LoginOrRegister.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = ({
});

const mapStateToProps = state => ({
  isUserLoggedIn: isUserLoggedIn(state),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister)
);