import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FaceIcon from '@material-ui/icons/Face';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { actionDoSignUp } from 'actions/user/signup';
import { isUserRegisteringInProgress } from 'selectors/user';

import styles from './index.styles';

class SignUp extends Component {
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
    if (nextProps.isUserRegisteringInProgress) {
      this.props.onLoading();
    }
  }

  submit(e) {
    e.preventDefault();
    if (this.props.isUserRegisteringInProgress) {
      return;
    }

    this.props.actionDoSignUp(this.state.payload);
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FaceIcon />
          </Avatar>
          <Typography variant="headline">Sign up</Typography>
          <form onSubmit={this.submit} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                id="firstName"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                onChange={this.setPayload}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input
                id="lastName"
                name="lastName"
                autoComplete="lastName"
                autoFocus
                onChange={this.setPayload}
              />
            </FormControl>
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
              Sign up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
} 

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = ({
  actionDoSignUp
});

const mapStateToProps = state => ({
  isUserRegisteringInProgress: isUserRegisteringInProgress(state),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(SignUp)
);