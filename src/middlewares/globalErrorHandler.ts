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
  // Default error values
  let statusCode = 500;
  let message = 'Internal server error';
  let errorMessages: Record<string, unknown>[] = [];
  let stack = '';
  let validationError = '';

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation failed';

    const formattedError = fromZodError(error, {
      prefix: null,
      includePath: true,
    });

    validationError = formattedError.toString();

    // Format validation errors for better client-side handling
    errorMessages = error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
  }
  // Handle API errors
  else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    validationError = error.validationError;

    if (error.stack) {
      stack = error.stack;
    }

    if (error.validationError) {
      try {
        // Try to parse validation errors to structured format
        const parsedErrors = JSON.parse(error.validationError);
        if (Array.isArray(parsedErrors)) {
          errorMessages = parsedErrors;
        }
      } catch {
        // If not parseable, use as string
        errorMessages = [{ message: error.validationError }];
      }
    }
  }
  // Handle other errors
  else {
    message = error?.message || 'Internal server error';
    if (error?.stack) {
      stack = error.stack;
    }
  }

  // Determine if message should be shown (authentication/authorization errors are always shown)
  const isAuthError = statusCode === 401 || statusCode === 403;
  const shouldShowMessage =
    isAuthError ||
    config.env === 'development' ||
    (error instanceof ApiError && error.isPublic);

  // Prepare the response object
  const responseData: Record<string, any> = {
    success: false,
    statusCode,
    message: shouldShowMessage ? message : 'Something went wrong',
  };

  // Include additional error details as appropriate
  if (errorMessages.length > 0) {
    responseData.errors = errorMessages;
  }

  // Only include stack trace and detailed errors in development
  if (config.env === 'development') {
    if (stack) {
      responseData.stack = stack;
    }
    if (validationError) {
      responseData.validationError = validationError;
    }
  }

  return res.status(statusCode).json(responseData);
};
