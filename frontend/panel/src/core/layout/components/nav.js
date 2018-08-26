import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { actionDoSignOut } from 'actions/user/signin';

const Nav = ({ actionDoSignOut }) => (
  <div>
    <Divider />
    <List>
      <ListItem button onClick={actionDoSignOut}>
        <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  </div>
);

const mapDispatchToProps = ({
  actionDoSignOut
});

const mapStateToProps = state => ({
});

export default (
  connect(mapStateToProps, mapDispatchToProps)(Nav)
);