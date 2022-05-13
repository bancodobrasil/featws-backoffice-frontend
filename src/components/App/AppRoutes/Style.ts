import { makeStyles } from '@mui/styles';

const Style = makeStyles(theme => ({
  main: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  base: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  mainContent: {
    width: '100%',
    flex: 1,
    boxSizing: 'border-box',
    paddingLeft: '32px',
    paddingRight: '32px',
  },
}));

export default Style;
