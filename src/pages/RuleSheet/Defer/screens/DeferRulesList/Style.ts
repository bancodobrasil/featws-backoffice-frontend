import { makeStyles } from '@mui/styles';

const Style = makeStyles(theme => ({
  headingContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 11,
  },
  h1: {
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '24px',
    letterSpacing: '0.18px',
    margin: 0,
  },
  mainContainer: {
    marginTop: 26,
  },
  filtersHeading: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
  },
  filterSelect: {
    minWidth: 320,
    marginRight: 38,
    '& .featws-ui-MuiFormLabel-root': {
      fontWeight: '600',
      fontSize: '16px',
      letterSpacing: '0.15px',
      color: 'rgba(0, 0, 0, 0.38)',
      top: '-9px',
    },
    '& .featws-ui-MuiInputLabel-shrink': {
      color: 'black',
      top: '0',
    },
    '& .featws-ui-MuiSelect-outlined': {
      padding: '10px 32px 10px 14px',
    },
    '& .featws-ui-MuiOutlinedInput-root': {
      height: '40px',
    },
  },
  buttonSearch: {
    width: 169,
  },
  chipStatus: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    '& .featws-ui-MuiChip-label': {
      paddingLeft: 4,
    },
  },
  divider: {
    marginTop: 19,
  },
  containerActionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  buttonAdvance: {
    marginLeft: 16,
  },
  dataGrid: {
    marginTop: 16,
    '& .MuiDataGrid-main': {
      '& .MuiDataGrid-columnsContainer .MuiDataGrid-columnHeader:last-child': {
        '& .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
      },
      '&  .MuiDataGrid-cell:focus-within': {
        outline: 'none',
      },
    },
  },
}));

export default Style;
