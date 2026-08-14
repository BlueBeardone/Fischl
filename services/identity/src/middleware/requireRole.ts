import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { AuthService } from '../services/auth.service';

export const requireRole =
  (...roles: string[]) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.userId) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }
    const user = await new AuthService().getRawUser(req.userId);
    if (!user) {
      res.status(401).json({ success: false, message: 'User not found' });
      return;
    }
    const hasRole = roles.some((role) => (user.roles ?? []).includes(role));
    if (!hasRole) {
      res.status(403).json({ success: false, message: 'Forbidden' });
      return;
    }
    next();
  };
