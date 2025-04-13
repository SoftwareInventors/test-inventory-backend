import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../errors/ApiError';
import config from '../app/config/config';

declare module 'express' {
  interface Request {
    user?: any;
  }
}

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized - No token provided',
      );
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, config.access_token_secret_key as string);

    // Add user to request
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError(401, 'Invalid token'));
    } else {
      next(error);
    }
  }
};

export default verifyUser;
