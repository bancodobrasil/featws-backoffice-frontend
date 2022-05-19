/* eslint-disable max-classes-per-file */
import i18n from '../../i18n';

class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

class APIError extends BaseError {
  statusCode: number;

  constructor(statusCode: number, message?: string) {
    const defaultMessage = message || i18n.t(`notification.error.APIError.message`);
    super(defaultMessage);
    this.statusCode = statusCode;
  }
}

class UnhandledError extends BaseError {
  originalError: unknown;

  constructor(originalError: unknown, message?: string) {
    const defaultMessage = message || i18n.t(`notification.error.UnhandledError.message`);
    super(defaultMessage);
    this.originalError = originalError;
    if (originalError instanceof Error) {
      this.stack = originalError.stack || this.stack;
    }
  }
}

export { APIError, UnhandledError };
