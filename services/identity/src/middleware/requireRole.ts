import { NextFunction, Request, Response } from 'express';

export const requireRole =
  (..._roles: string[]) =>
  (_req: Request, _res: Response, next: NextFunction): void => {
    next();
  };