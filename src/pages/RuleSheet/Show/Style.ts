import { makeStyles } from '@material-ui/core/styles';

const Style = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
  },
  breadcrumbsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  breadcrumbs: {
    '& .featws-ui-MuiBreadcrumbs-separator': {
      display: 'none',
    },
  },
  breadcrumbsSeparator: {
    color: 'black',
    marginRight: 8,
    marginLeft: 8,
    '&.last': {
      color: '#BFC3CA',
    },
  },
  breadcrumbActive: {
    color: '#BFC3CA',
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
