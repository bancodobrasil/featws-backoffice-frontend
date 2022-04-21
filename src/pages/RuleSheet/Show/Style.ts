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
    marginBottom: 16,
  },
  headingButtonsContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  fieldsContainer: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontWeight: 700,
  },
  fieldValue: {
    marginLeft: 8,
  },
  actionButtonsContainer: {
    marginTop: 16,
  },
  loadingRecord: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default Style;
