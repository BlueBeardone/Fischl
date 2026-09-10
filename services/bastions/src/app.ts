import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { bastionRouter } from './routes/bastion.routes';
import { facilityRouter } from './routes/facility.routes';
import { hirelingRouter } from './routes/hireling.routes';
import { defenderRouter } from './routes/defender.routes';
import { newspaperArticleRouter } from './routes/newspaper-article.routes';
import { errorHandler } from './middleware/error-handler';
import { connectDatabase } from './config/database';

dotenv.config();

export const createApp = async (): Promise<Application> => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  await connectDatabase();

  app.get('/health', (_req, res) => {
    res.json({ success: true, message: 'Bastions service is healthy' });
  });

  app.use('/bastions', bastionRouter);
  app.use('/facilities', facilityRouter);
  app.use('/hirelings', hirelingRouter);
  app.use('/defenders', defenderRouter);
  app.use('/newspapers', newspaperArticleRouter);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    errorHandler(err, res);
  });

  return app;
};
