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
    const defaultMessage = message || 'Ocorreu um problema na requisição.';
    super(defaultMessage);
    this.statusCode = statusCode;
  }
}

export { APIError };
