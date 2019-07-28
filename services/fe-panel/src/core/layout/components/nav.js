import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ExposureIcon from '@material-ui/icons/Exposure';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';

import { actionDoSignOut } from 'actions/user/signin';

const styles = theme => ({
  selected: {
    background: theme.palette.action.hover
  }
});

const Nav = ({ classes, actionDoSignOut, location }) => (
  <div>
    <List>
      <Link to="/">
        <ListItem button className={location.pathname === '/' ? classes.selected : ''}>
          <ListItemIcon><ExposureIcon /></ListItemIcon>
          <ListItemText primary="Math" />
        </ListItem>
      </Link>
    </List>
    <Divider />
    <List>
      <Link to="/jobs">
        <ListItem button className={location.pathname === '/jobs' ? classes.selected : ''}>
          <ListItemIcon><OfflinePinIcon /></ListItemIcon>
          <ListItemText primary="Jobs" />
        </ListItem>
      </Link>
    </List>
    <Divider />
    <List>
      <ListItem button onClick={actionDoSignOut}>
        <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  </div>
);

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = ({
  actionDoSignOut
});

const mapStateToProps = state => ({
});

export default withRouter(withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Nav)
));