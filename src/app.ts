import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.route';
import { notFoundHandler } from './middlewares/notFoundHandler';

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
app.use(notFoundHandler);

export default app;
