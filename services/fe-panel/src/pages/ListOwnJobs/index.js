import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

import { actionLoadOwnJobs } from 'actions/job/load';
import { getOwnJobsData, isFetchingOwnJobsInProgress } from 'selectors/job';

import styles from './index.styles';

class ListOwnJobs extends Component {
  componentDidMount() {
    // hack to make it work when page reloaded.
    setTimeout(() => this.props.actionLoadOwnJobs(), 10);
  }

  render() {
    const { classes, isFetchingOwnJobsInProgress, ownJobsData } = this.props;

    if (isFetchingOwnJobsInProgress !== false || !ownJobsData) {
      return (
        <main className={classes.spinner}>
          <CircularProgress size={70} />
        </main>
      );
    }

    return (
      <div className={classes.root}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell component="th">ID</TableCell>
                  <TableCell component="th">Type</TableCell>
                  <TableCell component="th">Operations</TableCell>
                  <TableCell component="th">State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ownJobsData.map(job => {
                  return (
                    <TableRow key={job.id}>
                      <TableCell scope="row">{job.id}</TableCell>
                      <TableCell scope="row">{job.type}</TableCell>
                      <TableCell scope="row">
                        {job.details.map((detail, index) => {
                          return (
                            <div className={classes.operation} key={index}>
                              {detail.method}: {detail.numbers} = <strong>{detail.result}</strong>
                            </div>
                          );
                        })}
                      </TableCell>
                      <TableCell scope="row">
                        {job.done ?
                          <div title="Completed"><CheckCircleIcon style={{color:'#2e7d32'}}/></div>:
                          <div title="In Progress"><QueryBuilderIcon style={{color:'#666666'}}/></div>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </main>
      </div>
    );
  }
}

ListOwnJobs.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = ({
  actionLoadOwnJobs
});

const mapStateToProps = state => ({
  ownJobsData: getOwnJobsData(state),
  isFetchingOwnJobsInProgress: isFetchingOwnJobsInProgress(state),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ListOwnJobs)
);