import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
  () => ({
    root: {
      marginBottom: 16,
    },
    title: {
      color: 'white',
      textShadow: '2px 2px rgb(183 183 183)',
    },
  }),
  { name: 'App' }
);

function Header() {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.root} color="secondary">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          Aphrodite Project
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
