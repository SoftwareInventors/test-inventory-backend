export class ApiError extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string, stack?: '') {
    super(message);
    this.statusCode = statusCode;

    if (stack) this.stack = stack; // If dev gave a stack trace, use it
    else Error.captureStackTrace(this); // Otherwise, let JS generate the stack trace
  }
}
