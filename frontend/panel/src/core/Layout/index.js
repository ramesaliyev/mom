import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { isUserLoggedIn, getUserInfo } from 'selectors/user';

import AppBarComponent from './components/appbar';
import DrawerComponent from './components/drawer';

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
    const { classes, children, isUserLoggedIn } = this.props;
    const { isDrawerOpen } = this.state;

    return (
      <div className={classes.root}>
        <AppBarComponent 
          classes={classes}
          isDrawerOpen={isDrawerOpen}
          onMenuClick={this.toggleDrawer}
          showMenuButton={isUserLoggedIn}
        />

        {isUserLoggedIn &&
          <DrawerComponent
            classes={classes}
            isDrawerOpen={isDrawerOpen}
            onChevronClick={this.toggleDrawer}
          />
        }

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

const mapDispatchToProps = ({
});

const mapStateToProps = state => ({
  userInfo: getUserInfo(state),
  isUserLoggedIn: isUserLoggedIn(state)
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(MiniDrawer)
);