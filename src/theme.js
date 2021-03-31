import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[100],
    },
    secondary: {
      main: pink[100],
    },
    background: {
      default: red[100],
    }
  },
});

export default theme;
