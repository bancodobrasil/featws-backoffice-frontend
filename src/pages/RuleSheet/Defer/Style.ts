import { makeStyles } from '@material-ui/core/styles';

const Style = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: 34,
    paddingBottom: 34,
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
  loadingRecord: {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default Style;
