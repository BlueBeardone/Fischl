import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { roleRouter } from './routes/role.routes';
import { errorHandler } from './middleware/error-handler';
import { connectDatabase } from './config/database';

dotenv.config();

export const createApp = async (): Promise<Application> => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  await connectDatabase();

  app.get('/health', (_req, res) => {
    res.json({ success: true, message: 'Identity service is healthy' });
  });

  app.use('/identity', authRouter);
  app.use('/identity', userRouter);
  app.use('/identity', roleRouter);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    errorHandler(err, res);
  });

  return app;
};
