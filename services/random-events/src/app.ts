import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createEventsRouter } from './routes/event.routes';
import { rewardTableRouter } from './routes/reward-table.routes';
import { errorHandler } from './middleware/error-handler';
import { connectDatabase } from './config/database';

dotenv.config();

export const createApp = async (): Promise<Application> => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  await connectDatabase();

  app.get('/health', (_req, res) => {
    res.json({ success: true, message: 'Random events service is healthy' });
  });

  app.use('/events/bastion-individual-events', createEventsRouter({ collection: 'bastionIndividualEvents', label: 'Bastion individual event' }));

  app.use('/reward-tables', rewardTableRouter);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    errorHandler(err, res);
  });

  return app;
};
