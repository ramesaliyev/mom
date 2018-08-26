import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { actionDoSignIn } from 'actions/user/signin';
import { isUserLoggedIn, isUserLoginInProgress } from 'selectors/user';

import styles from './index.styles';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payload: {
        email: null,
        password: null
      }
    }

    this.setPayload = this.setPayload.bind(this);
    this.submit = this.submit.bind(this);
  }

  setPayload(e) {
    this.setState({
      payload: {
        ...this.state.payload,
        [e.target.name]: e.target.value
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isUserLoginInProgress) {
      this.props.onLoading();
    }
  }

  submit(e) {
    e.preventDefault();

    this.props.actionDoSignIn(this.state.payload);
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="headline">Sign in</Typography>
          <form onSubmit={this.submit} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.setPayload}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.setPayload}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
} 

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = ({
  actionDoSignIn
});

const mapStateToProps = state => ({
  isUserLoggedIn: isUserLoggedIn(state),
  isUserLoginInProgress: isUserLoginInProgress(state)
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(SignIn)
);