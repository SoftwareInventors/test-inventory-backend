/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../errors/ApiError';
import config from '../app/config/config';
import { fromZodError } from 'zod-validation-error';

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // if it is a zod error then convert it to an ApiError
  if (error instanceof ZodError) {
    error = new ApiError(
      400,
      'Validation Error!',
      true,
      fromZodError(error, {
        prefix: null,
        includePath: true,
      }).toString(),
    );
  }

  // if unexpected error then convert it to an ApiError
  if (!(error instanceof ApiError)) {
    error = new ApiError(
      500,
      error.message || 'unexpected error',
      false,
      error.stack,
    );
  }

  // hide the internal error message from the client
  const message = error.isPublic
    ? error.message
    : 'Sorry!something went wrong in our internal server';

  return res.status(error.statusCode).json({
    success: false,
    message,
    stack: config.env === 'development' ? error.stack : '',
    validationError: error.validationError.length ? error.validationError : '',
  });
};
