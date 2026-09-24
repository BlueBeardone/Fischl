import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { roleRouter } from './routes/role.routes';
import { appRouter } from './routes/app.routes';
import { errorHandler } from './middleware/error-handler';
import { connectDatabase } from './config/database';
import { getJwtSecret } from './config/jwt';
import { migrateLegacyRoles } from './bootstrap/migrate-legacy-roles';
import { bootstrapAdmin } from './bootstrap/admin';

dotenv.config();

export const createApp = async (): Promise<Application> => {
  const app = express();

  const corsOrigins = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
  app.use(cors({ origin: corsOrigins.length > 0 ? corsOrigins : false }));
  app.use(express.json());

  getJwtSecret();
  await connectDatabase();
  await migrateLegacyRoles();
  await bootstrapAdmin();

  app.get('/health', (_req, res) => {
    res.json({ success: true, message: 'Identity service is healthy' });
  });

  app.use('/identity', authRouter);
  app.use('/identity', userRouter);
  app.use('/identity', roleRouter);
  app.use('/identity', appRouter);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    errorHandler(err, res);
  });

  return app;
};
