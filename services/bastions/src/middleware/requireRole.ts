import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from './auth.middleware';

export const requireRole =
  (...roles: string[]) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const userRoles = req.userRoles ?? [];
    if (!roles.some((role) => userRoles.includes(role))) {
      res.status(403).json({ success: false, message: 'Forbidden' });
      return;
    }
    next();
  };
