import { NextFunction, Response } from 'express';
import { DefenderService } from '../services/defender.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class DefenderController {
  constructor(private readonly service = new DefenderService()) {}

  create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const defender = await this.service.create(req.body, req.userId!);
      res.status(201).json({ success: true, data: defender });
    } catch (error) {
      next(error);
    }
  };

  listAll = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const defenders = await this.service.listAll();
      res.status(200).json({ success: true, data: defenders });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const defender = await this.service.getById(req.params.id as string);
      if (!defender) {
        res.status(404).json({ success: false, message: 'Defender not found' });
        return;
      }
      res.status(200).json({ success: true, data: defender });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const defender = await this.service.update(req.params.id as string, req.body, req.userId!);
      if (!defender) {
        res.status(404).json({ success: false, message: 'Defender not found' });
        return;
      }
      res.status(200).json({ success: true, data: defender });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.delete(req.params.id as string, req.userId!);
      res.status(200).json({ success: true, message: 'Defender deleted' });
    } catch (error) {
      next(error);
    }
  };
}
