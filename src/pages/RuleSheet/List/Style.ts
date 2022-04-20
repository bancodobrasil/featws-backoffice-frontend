import { makeStyles } from '@material-ui/core/styles';

const Style = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  headingContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  headingButtonsContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  dataGrid: {
    marginTop: 16,
    '& .MuiDataGrid-main .MuiDataGrid-cell:focus-within': {
      outline: 'none',
    },
  },
}));

export default Style;
