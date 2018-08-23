import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { topMenuItems, bottomMenuItems } from './menu-items';

import styles from './index.styles'

class MiniDrawer extends Component {
  state = {
    isDrawerOpen: false,
  };

  constructor(props) {
    super(props);

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = () => {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen
    });
  };

  render() {
    const { classes, children } = this.props;
    const { isDrawerOpen } = this.state;
    
    const AppBarClasses = classNames(classes.appBar, {
      [classes.appBarShift]: isDrawerOpen
    });

    const ToolbarIconClasses = classNames(classes.menuButton, {
      [classes.hide]: isDrawerOpen
    });

    const DrawerPapperClasses = classNames(classes.drawerPaper, {
      [classes.drawerPaperClose]: !isDrawerOpen
    });

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={AppBarClasses}>
          <Toolbar disableGutters={!isDrawerOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer}
              className={ToolbarIconClasses}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              MOM Based Architecture POC | Panel
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{ paper: DrawerPapperClasses }}
          open={isDrawerOpen}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{topMenuItems}</List>
          <Divider />
          <List>{bottomMenuItems}</List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);