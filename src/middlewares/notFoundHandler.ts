/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';

export const notFoundHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new ApiError(404, 'Not Found'));
};
