import React from 'react';
import classNames from 'classnames';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Nav from './nav';

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
      <Nav />
    </Drawer>
  );
}

export default DrawerComponent;