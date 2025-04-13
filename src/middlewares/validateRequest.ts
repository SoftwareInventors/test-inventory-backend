import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { ApiError } from '../errors/ApiError';

const validateRequest = (schema: z.ZodObject<any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert the Zod error to a more readable format
        const message = 'Validation failed';
        const validationError = JSON.stringify(error.errors);

        // Create ApiError with properly formatted parameters
        next(new ApiError(400, message, true, validationError));
      } else {
        next(error);
      }
    }
  };
};

export default validateRequest;
