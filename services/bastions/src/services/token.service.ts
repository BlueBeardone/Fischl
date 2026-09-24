import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../config/jwt';

const TOKEN_EXPIRY = '90d';

export function signToken(userId: string, roles: string[] = []): string {
  return jwt.sign({ sub: userId, roles }, getJwtSecret(), { expiresIn: TOKEN_EXPIRY });
}
