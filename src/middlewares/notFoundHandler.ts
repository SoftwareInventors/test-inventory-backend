import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';
import httpStatus from 'http-status';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(
    new ApiError(
      httpStatus.NOT_FOUND,
      `Cannot find ${req.method} ${req.originalUrl} on this server!`,
      true,
    ),
  );
};
