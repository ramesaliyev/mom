import React from 'react';
import classNames from 'classnames';

import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { topMenuItems, bottomMenuItems } from './drawer-menu';

const DrawerComponent = ({ classes, onChevronClick, isDrawerOpen }) => {
  const DrawerPapperClasses = classNames(classes.drawerPaper, {
    [classes.drawerPaperClose]: !isDrawerOpen
  });

  return (
    <Drawer
      variant="permanent"
      classes={{ paper: DrawerPapperClasses }}
      open={isDrawerOpen}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={onChevronClick}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{topMenuItems}</List>
      <Divider />
      <List>{bottomMenuItems}</List>
    </Drawer>
  );
}

export default DrawerComponent;