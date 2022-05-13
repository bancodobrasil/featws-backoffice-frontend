import { makeStyles } from '@mui/styles';

const Style = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    paddingTop: 16,
    paddingBottom: 16,
  },
  breadcrumbsContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    left: '-5px',
    top: '-5px',
  },
  breadcrumbs: {
    '& .featws-ui-MuiBreadcrumbs-separator': {
      display: 'none',
    },
    marginLeft: 5,
    color: '#000000',
    fontWeight: 300,
    fontSize: '14px',
    lineHeight: '24px',
    letterSpacing: '0.1px',
  },
  breadcrumbsSeparator: {
    color: 'black',
    marginRight: 8,
    marginLeft: 8,
    '&.last': {
      color: '#BFC3CA',
    },
  },
  breadcrumbItem: {},
  breadcrumbActive: {
    color: '#BFC3CA',
  },
  gridContainer: {
    paddingTop: 11,
    height: '100%',
    '& .featws-ui-MuiPaper-root': {
      height: '90%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  h1: {
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '24px',
    letterSpacing: '0.18px',
    margin: 0,
    padding: 16,
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    marginTop: 25,
    marginLeft: 16,
    marginRight: 16,
    '& .featws-ui-MuiInputLabel-shrink': {
      fontSize: 16,
    },
  },
  actionContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  actionDividerContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    '& .featws-ui-MuiDivider-root': {
      flex: 1,
    },
  },
  actionButtonsContainer: {
    margin: 16,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonSubmit: {
    marginLeft: 16,
  },
}));

export default Style;
