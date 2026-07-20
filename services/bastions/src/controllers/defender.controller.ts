import { NextFunction, Request, Response } from 'express';
import { DefenderService } from '../services/defender.service';

export class DefenderController {
  constructor(private readonly service = new DefenderService()) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const defender = await this.service.create(req.body);
      res.status(201).json({ success: true, data: defender });
    } catch (error) {
      next(error);
    }
  };

  listAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const defenders = await this.service.listAll();
      res.status(200).json({ success: true, data: defenders });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const defender = await this.service.getById(req.params.id);
      if (!defender) {
        res.status(404).json({ success: false, message: 'Defender not found' });
        return;
      }
      res.status(200).json({ success: true, data: defender });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const defender = await this.service.update(req.params.id, req.body);
      if (!defender) {
        res.status(404).json({ success: false, message: 'Defender not found' });
        return;
      }
      res.status(200).json({ success: true, data: defender });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.delete(req.params.id);
      res.status(200).json({ success: true, message: 'Defender deleted' });
    } catch (error) {
      next(error);
    }
  };
}