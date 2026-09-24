import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { signToken } from '../services/token.service';
import { getJwtSecret } from '../config/jwt';

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userRoles?: string[];
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Authentication required' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { sub: string; roles?: string[] };
    req.userId = decoded.sub;
    req.userRoles = decoded.roles ?? [];
    res.setHeader('X-Renewed-Token', signToken(decoded.sub, req.userRoles));
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
