import jwt from 'jsonwebtoken';

const TOKEN_EXPIRY = '90d';

export function signToken(userId: string): string {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.sign({ sub: userId }, secret, { expiresIn: TOKEN_EXPIRY });
}
