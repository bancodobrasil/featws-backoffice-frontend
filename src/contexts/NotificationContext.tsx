import React, { createContext, useEffect, useReducer } from 'react';
import { Alert, AlertProps, AlertTitle } from '@material-ui/lab';
import { Snackbar, SnackbarCloseReason, SnackbarProps } from '@material-ui/core';

type State = {
  isOpen: boolean;
  title?: string | JSX.Element;
  message: string | JSX.Element;
  snackbarProps: Omit<SnackbarProps, 'children' | 'open'>;
  defaultSnackbarOnClose: (
    event: React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason,
  ) => void;
  alertProps: Omit<AlertProps, 'children'>;
  defaultAlertOnClose: (event: React.SyntheticEvent<any, Event>) => void;
};

enum ActionTypes {
  SET_DEFAULT_ON_CLOSE = 'SET_DEFAULT_ON_CLOSE',
  OPEN_NOTIFICATION = 'OPEN_NOTIFICATION',
  CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION',
}

type Action =
  | {
      type: ActionTypes.SET_DEFAULT_ON_CLOSE;
      snackbarOnClose: (
        event: React.SyntheticEvent<any, Event>,
        reason: SnackbarCloseReason,
      ) => void;
      alertOnClose: (event: React.SyntheticEvent<any, Event>) => void;
    }
  | {
      type: ActionTypes.OPEN_NOTIFICATION;
      title?: string | JSX.Element;
      message: string | JSX.Element;
      snackbarProps?: Omit<SnackbarProps, 'children' | 'open' | 'message'>;
      alertProps?: Omit<AlertProps, 'children'>;
    }
  | {
      type: ActionTypes.CLOSE_NOTIFICATION;
    };

const defaultSnackbarProps: AlertProps = {};
const defaultAlertProps: AlertProps = {
  variant: 'filled',
};
const initialState = {
  isOpen: false,
  title: undefined,
  message: '',
  snackbarProps: defaultSnackbarProps,
  defaultSnackbarOnClose: () => {},
  alertProps: defaultAlertProps,
  defaultAlertOnClose: () => {},
};

const NotificationContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const { Provider } = NotificationContext;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_DEFAULT_ON_CLOSE:
      return {
        ...state,
        defaultSnackbarOnClose: action.snackbarOnClose,
        defaultAlertOnClose: action.alertOnClose,
      };
    case ActionTypes.OPEN_NOTIFICATION:
      return {
        ...initialState,
        isOpen: true,
        title: action.title,
        message: action.message,
        snackbarProps: { onClose: state.defaultSnackbarOnClose, ...action.snackbarProps } || {
          ...defaultSnackbarProps,
          onClose: state.defaultSnackbarOnClose,
        },
        alertProps: { onClose: state.defaultAlertOnClose, ...action.alertProps } || {
          ...defaultAlertProps,
          onClose: state.defaultAlertOnClose,
        },
      };
    case ActionTypes.CLOSE_NOTIFICATION:
      return {
        ...state,
        isOpen: false,
        defaultSnackbarOnClose: state.defaultSnackbarOnClose,
        defaultAlertOnClose: state.defaultAlertOnClose,
      };
    default:
      throw new Error(`NotificationContext: Action not found`);
  }
};

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSnackbarCloseHandler = (
    event: React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: ActionTypes.CLOSE_NOTIFICATION });
  };
  const onAlertCloseHandler = (event: React.SyntheticEvent<any, Event>) => {
    dispatch({ type: ActionTypes.CLOSE_NOTIFICATION });
  };

  useEffect(() => {
    dispatch({
      type: ActionTypes.SET_DEFAULT_ON_CLOSE,
      snackbarOnClose: onSnackbarCloseHandler,
      alertOnClose: onAlertCloseHandler,
    });
  }, [dispatch]);

  return (
    <Provider value={{ state, dispatch }}>
      {children}
      <Snackbar {...state.snackbarProps} open={state.isOpen}>
        <Alert {...state.alertProps}>
          {state.title && <AlertTitle>{state.title}</AlertTitle>}
          {state.message}
        </Alert>
      </Snackbar>
    </Provider>
  );
};

export { NotificationContext, NotificationProvider, ActionTypes };
