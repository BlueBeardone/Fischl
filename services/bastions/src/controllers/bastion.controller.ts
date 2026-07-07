import { NextFunction, Request, Response } from 'express';
import { BastionService } from '../services/bastion.service';

export class BastionController {
  constructor(private readonly bastionService = new BastionService()) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bastion = await this.bastionService.create(req.body);
      res.status(201).json({ success: true, data: bastion });
    } catch (error) {
      next(error);
    }
  };

  listAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bastions = await this.bastionService.listAll();
      res.status(200).json({ success: true, data: bastions });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bastion = await this.bastionService.getById(req.params.id);
      res.status(200).json({ success: true, data: bastion });
    } catch (error) {
      next(error);
    }
  };

  listByOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bastions = await this.bastionService.listByOwner(req.params.userId);
      res.status(200).json({ success: true, data: bastions });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bastion = await this.bastionService.update(req.params.id, req.body);
      res.status(200).json({ success: true, data: bastion });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.bastionService.delete(req.params.id);
      res.status(200).json({ success: true, message: 'Bastion deleted' });
    } catch (error) {
      next(error);
    }
  };
}
