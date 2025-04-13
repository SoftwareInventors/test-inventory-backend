export class ApiError extends Error {
  public statusCode: number;
  public isPublic: boolean;
  public validationError: string;

  constructor(
    statusCode: number,
    message: string,
    isPublic?: boolean,
    validationError?: string,
    stack?: '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isPublic = isPublic || false;
    this.validationError = validationError || '';

    if (stack) this.stack = stack; // If dev gave a stack trace, use it
    else Error.captureStackTrace(this); // Otherwise, let JS generate the stack trace
  }
}
