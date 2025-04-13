/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { ApiError } from '../errors/ApiError';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = result.body;
      req.query = result.query;
      req.params = result.params;
      return next();
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  };
};
