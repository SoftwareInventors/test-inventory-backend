import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.route';

const app: Application = express();

/** APPLICATION MIDDLEWARES */
app.use(cors());
app.use(express.json());

//** APPLICATION ROUTES */
app.use('/api/v1/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello From Node Typescript Clean Template From the Organization!');
});

export default app;
