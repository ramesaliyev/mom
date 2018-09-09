import React from 'react';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import CodeIcon from '@material-ui/icons/Code';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const AppBarComponent = ({ classes, onMenuClick, isDrawerOpen, showMenuButton }) => {
  const AppBarClasses = classNames(classes.appBar, {
    [classes.appBarShift]: isDrawerOpen
  });

  const ToolbarIconClasses = classNames({
    [classes.hide]: isDrawerOpen
  });

  return (
    <AppBar position="absolute" className={AppBarClasses}>
      <Toolbar disableGutters={!isDrawerOpen}>
        <div className={classes.menuButtonWrapper}>
          {showMenuButton &&
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={onMenuClick}
              className={ToolbarIconClasses}
            >
              <MenuIcon />
            </IconButton>
          }
        </div>
        <Typography variant="title" color="inherit" noWrap className={classes.flex}>
          MOM Based Architecture POC | Panel
        </Typography>
        <div className={classes.codeButtonWrapper}>
          <a href="https://github.com/ramesaliyev/mom" target="_blank" className={classes.link}>
            <IconButton
              color="inherit"
              className={ToolbarIconClasses}
            >
              <CodeIcon />
            </IconButton>
          </a>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;