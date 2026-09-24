import { NextFunction, Response } from 'express';
import { HirelingService } from '../services/hireling.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class HirelingController {
  constructor(private readonly service = new HirelingService()) {}

  create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const hireling = await this.service.create(req.body, req.userId!);
      res.status(201).json({ success: true, data: hireling });
    } catch (error) {
      next(error);
    }
  };

  listAll = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const hirelings = await this.service.listAll();
      res.status(200).json({ success: true, data: hirelings });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const hireling = await this.service.getById(req.params.id as string);
      if (!hireling) {
        res.status(404).json({ success: false, message: 'Hireling not found' });
        return;
      }
      res.status(200).json({ success: true, data: hireling });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const hireling = await this.service.update(req.params.id as string, req.body, req.userId!);
      if (!hireling) {
        res.status(404).json({ success: false, message: 'Hireling not found' });
        return;
      }
      res.status(200).json({ success: true, data: hireling });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.delete(req.params.id as string, req.userId!);
      res.status(200).json({ success: true, message: 'Hireling deleted' });
    } catch (error) {
      next(error);
    }
  };
}