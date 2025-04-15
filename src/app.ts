import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.route';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { categoryRoutes } from './routes/category.route';
import { productRoutes } from './routes/product.route';
import { ApiError } from './errors/ApiError';
import { ZodError } from 'zod';

const app: Application = express();

/** APPLICATION REGULAR MIDDLEWARES */
app.use(cors());
app.use(express.json());

//** APPLICATION ROUTES */
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello From Test Inventory Backend!!');
});

//** APPLICATION ERROR MIDDLEWARES */
// Handle 404 - Route not found
app.all('*', notFoundHandler);

// Global error handler - must be last middleware
app.use(
  (
    err: Error | ApiError | ZodError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    globalErrorHandler(err, req, res, next);
  },
);

export default app;
