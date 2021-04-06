import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import GitHub from '@material-ui/icons/GitHub';
import Info from '@material-ui/icons/Info';

const useStyles = makeStyles(
  () => ({
    root: {
      marginBottom: 16,
    },
    title: {
      color: 'white',
      width: '100%',
      textShadow: '2px 2px rgb(183 183 183)',
    },
    icon: {
      color: 'white',
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
        <a
          href="https://www.notion.so/Aphrodite-Project-1f73d46292bc46f29cc6846451fe59f8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton
            className={classes.icon}
            edge="start"
            color="inherit"
            aria-label="github"
          >
            <Info />
          </IconButton>
        </a>
        <a
          href="https://github.com/steven11329/aphrodite"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton
            className={classes.icon}
            edge="start"
            color="inherit"
            aria-label="github"
          >
            <GitHub />
          </IconButton>
        </a>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
