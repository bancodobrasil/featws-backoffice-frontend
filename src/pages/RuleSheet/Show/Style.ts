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
    paddingRight: 9,
  },
  chipSlug: {
    backgroundColor: '#F4F5F7',
    color: '#346AFF',
  },
  descriptionContainer: {
    marginTop: 28,
    marginBottom: 24,
  },
  description: {
    margin: 0,
    color: '#6C7077',
  },
  code: {
    color: '#6C7077',
    fontWeight: 700,
  },
  rulesTotal: {
    color: '#6C7077',
    fontWeight: 700,
    marginBottom: 24,
  },
  deferRuleButton: {
    marginBottom: 20,
  },
  rulesHeading: {
    margin: 0,
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
