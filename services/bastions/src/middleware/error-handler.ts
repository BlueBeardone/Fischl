import { Response } from 'express';
import { AppError } from '../errors/http-errors';

export const errorHandler = (error: unknown, res: Response): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ success: false, message: error.message });
    return;
  }
  const message = error instanceof Error ? error.message : 'Unexpected error';
  res.status(400).json({ success: false, message });
};
