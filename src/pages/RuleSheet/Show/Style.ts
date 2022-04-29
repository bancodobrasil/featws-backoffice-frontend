import { makeStyles } from '@material-ui/core/styles';

const Style = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
  },
  headingContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: 16,
  },
  h1: {
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '24px',
    letterSpacing: '0.18px',
  },
  headingButtonsContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  loadingRecord: {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  gridContainer: {
    marginTop: 20,
  },
  gridLeft: {
    paddingLeft: 19,
  },
  gridRight: {
    paddingLeft: 81,
    paddingRight: 9,
  },
  chipSlug: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    width: 104,
    height: 32,
  },
  descriptionContainer: {
    marginTop: 28,
    marginBottom: 24,
  },
  description: {
    margin: 0,
    color: '#444444',
    fontSize: '18px',
    lineHeight: '25.2px',
  },
  code: {
    fontWeight: 700,
    fontSize: '14px',
  },
  rulesTotal: {
    fontWeight: 700,
    fontSize: '14px',
    marginBottom: 24,
  },
  deferRuleButton: {
    marginBottom: 20,
    width: '100%',
  },
  rulesHeading: {
    margin: 0,
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '24px',
    letterSpacing: '0.18px',
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
