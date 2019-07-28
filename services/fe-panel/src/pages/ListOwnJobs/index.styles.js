export default theme => ({
  root: {
    overflow: 'auto',
    height: '100%',
    paddingBottom: '200px'
  },
  layout: {
    width: '1100px',
    display: 'block', // Fix IE11 issue.
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down(800 + theme.spacing.unit * 3 * 2)]: {
      width: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px`,
  },
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '200px'
  },
  operation: {
    paddingBottom: '5px'
  }
});