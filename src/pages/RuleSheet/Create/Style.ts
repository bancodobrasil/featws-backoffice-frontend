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
  form: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    marginBottom: 16,
  },
  actionButtonsContainer: {
    marginTop: 16,
  },
}));

export default Style;
