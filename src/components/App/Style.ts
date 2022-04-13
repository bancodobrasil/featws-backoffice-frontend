import { makeStyles } from '@material-ui/core/styles';

const Style = makeStyles(theme => ({
  main: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f3f3f7',
  },
  base: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f3f3f7',
  },
  mainContent: {
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: '32px',
    paddingRight: '32px',
  },
}));

export default Style;
