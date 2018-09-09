import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExposureIcon from '@material-ui/icons/Exposure';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

import { actionCreateJob } from 'actions/job/create';
import { isJobCreationInProgress } from 'selectors/job';

import styles from './index.styles';

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

class CreateMathJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      operations: [
        this.createOperation()
      ]
    }

    this.addOperation = this.addOperation.bind(this);
    this.submit = this.submit.bind(this);
  }

  resetOperation() {
    this.setState({
      operations: [
        this.createOperation()
      ]
    })
  }

  createOperation() {
    return {
      method: 'add',
      numbers: `${getRandomInt(100, 999)},${getRandomInt(100, 999)},${getRandomInt(100, 999)}`,
    };
  }

  addOperation() {
    this.setState({
      operations: [
        ...this.state.operations,
        this.createOperation()
      ]
    });
  }

  updateOperation(index, key, value) {
    const { operations } = this.state;

    operations[index][key] = value;

    this.setState({
      operations: [
        ...operations
      ]
    });
  }

  submit(e) {
    e.preventDefault();

    if (this.props.isJobCreationInProgress) {
      return;
    }

    this.props.actionCreateJob({
      type: 'math',
      details: this.state.operations
    });

    this.resetOperation();
  }

  render() {
    const { classes, isJobCreationInProgress } = this.props;
    const { operations } = this.state;

    if (isJobCreationInProgress) {
      return (
        <main className={classes.spinner}>
          <CircularProgress size={70} />
        </main>
      );
    }

    return (
      <main className={classes.layout}>
        <form onSubmit={this.submit} className={classes.form}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ExposureIcon />
            </Avatar>
            <Typography variant="headline">Create Math Job</Typography>
          </Paper>
          {operations && operations.map((operation, index) =>
            <MathOperation
              key={index}
              classes={classes}
              details={operation}
              onMethodChange={value => this.updateOperation(index, 'method', value)}
              onNumbersChange={value => this.updateOperation(index, 'numbers', value)}
            />
          )}
          <Paper className={classes.paper}>
            <Button
              type="button"
              fullWidth
              variant="raised"
              color="secondary"
              className={classes.submit}
              onClick={this.addOperation}
            >
              Add Operation
            </Button>
          </Paper>
          <Paper className={classes.paper}>
            <Button
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
            >
              Queue Job
            </Button>
          </Paper>
        </form>
      </main>
    );
  }
} 

const MathOperation = ({ classes, details, onMethodChange, onNumbersChange }) => (
  <Paper className={classes.paper}>
    <Grid container spacing={8}>
      <Grid item xs={3}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="method">Method</InputLabel>
          <Select
            required
            value={details.method}
            onChange={e => onMethodChange(e.target.value)}
            input={<Input name="method" id="method" />}
          >
            <MenuItem value={'add'}>Add</MenuItem>
            <MenuItem value={'subtract'}>Subtract</MenuItem>
            <MenuItem value={'multiply'}>Multiply</MenuItem>
            <MenuItem value={'divide'}>Divide</MenuItem>
            <MenuItem value={'factors'}>Factors</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={9}>
        <TextField
          required
          label="Comma Separated Numbers"
          fullWidth
          onChange={e => onNumbersChange(e.target.value)}
          value={details.numbers}
        />
      </Grid>
    </Grid>
  </Paper>
);

CreateMathJob.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = ({
  actionCreateJob
});

const mapStateToProps = state => ({
  isJobCreationInProgress: isJobCreationInProgress(state),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(CreateMathJob)
);