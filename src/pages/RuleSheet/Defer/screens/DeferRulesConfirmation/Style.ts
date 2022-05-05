import { makeStyles } from '@material-ui/core/styles';

const Style = makeStyles(theme => ({
  paper: {
    marginTop: 11,
  },
  h1: {
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '24px',
    letterSpacing: '0.18px',
    margin: 0,
    padding: 16,
  },
  containerRule: {
    marginLeft: 16,
    marginRight: 16,
  },
  ruleField: {
    margin: 0,
    paddingTop: 16,
    '& span': {
      fontSize: 16,
    },
    '& span:first-child': {
      fontWeight: 700,
      marginRight: 8,
    },
  },
  containerRuleFilters: {
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    '& > span': {
      fontWeight: 700,
      fontSize: 16,
      marginRight: 8,
    },
  },
  containerRuleFiltersFields: {
    '& span': {
      fontSize: 16,
      display: 'list-item',
      listStyleType: 'disc',
      listStylePosition: 'inside',
    },
  },
  containerActionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 16,
  },
  buttonDefer: {
    marginLeft: 16,
  },
  dialog: {
    '& .featws-ui-MuiDialog-paper': {
      padding: 16,
    },
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    '& h3': {
      flex: 1,
      margin: 0,
      fontWeight: 700,
      fontSize: 22,
    },
  },
  dialogContent: {
    marginTop: 16,
    marginBottom: 32,
    fontSize: 16,
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  dialogButtonConfirm: {
    marginLeft: 16,
  },
}));

export default Style;
