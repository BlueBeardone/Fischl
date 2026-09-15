import { NextFunction, Response } from 'express';
import { BastionService } from '../services/bastion.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class BastionController {
  constructor(private readonly bastionService = new BastionService()) {}

  create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bastion = await this.bastionService.create(req.userId!, req.body);
      res.status(201).json({ success: true, data: bastion });
    } catch (error) {
      next(error);
    }
  };

  listAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const all = req.query.all === 'true';
      const bastions = await this.bastionService.listAll(req.userId!, all);
      res.status(200).json({ success: true, data: bastions });
    } catch (error) {
      next(error);
    }
  };

  browse = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number(req.query.page ?? 1);
      const limit = Number(req.query.limit ?? 20);
      const result = await this.bastionService.browse(req.userId!, page, limit);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bastion = await this.bastionService.getById(req.params.id as string, req.userId!);
      res.status(200).json({ success: true, data: bastion });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bastion = await this.bastionService.update(req.params.id as string, req.body, req.userId!);
      res.status(200).json({ success: true, data: bastion });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.bastionService.delete(req.params.id as string, req.userId!);
      res.status(200).json({ success: true, message: 'Bastion deleted' });
    } catch (error) {
      next(error);
    }
  };
}