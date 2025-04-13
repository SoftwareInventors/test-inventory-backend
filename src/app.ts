import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.route';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { globalErrorHandler } from './middlewares/globalErrorHandler';

const app: Application = express();

/** APPLICATION REGULAR MIDDLEWARES */
app.use(cors());
app.use(express.json());

//** APPLICATION ROUTES */
app.use('/api/v1/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello From Test Inventory Backend!!');
});

//** APPLICATION ERROR MIDDLEWARES */
// Handle 404 - Route not found
app.all('*', notFoundHandler);

// Global error handler - must be last middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next);
});

export default app;
