import { Response } from 'express';

export const errorHandler = (error: unknown, res: Response): void => {
  const message = error instanceof Error ? error.message : 'Unexpected error';
  res.status(400).json({ success: false, message });
};
