import { makeStyles } from '@mui/styles';

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
  dataGridContainer: {
    marginTop: 16,
  },
  dataGrid: {
    '& .MuiDataGrid-main': {
      '& .MuiDataGrid-columnsContainer .MuiDataGrid-columnHeader:last-child': {
        '& .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
      },
      '& .MuiDataGrid-cell': {
        cursor: 'pointer',
        '&:focus-within': {
          outline: 'none',
        },
      },
    },
  },
}));

export default Style;
