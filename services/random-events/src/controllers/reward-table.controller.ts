import { NextFunction, Response } from 'express';
import { RewardTableService } from '../services/reward-table.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class RewardTableController {
  constructor(private readonly service = new RewardTableService()) {}

  create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rewardTable = await this.service.create(req.body);
      res.status(201).json({ success: true, data: rewardTable });
    } catch (error) {
      next(error);
    }
  };

  listAll = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rewardTables = await this.service.listAll();
      res.status(200).json({ success: true, data: rewardTables });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rewardTable = await this.service.getById(req.params.id as string);
      if (!rewardTable) {
        res.status(404).json({ success: false, message: 'Reward table not found' });
        return;
      }
      res.status(200).json({ success: true, data: rewardTable });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rewardTable = await this.service.update(req.params.id as string, req.body);
      if (!rewardTable) {
        res.status(404).json({ success: false, message: 'Reward table not found' });
        return;
      }
      res.status(200).json({ success: true, data: rewardTable });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.delete(req.params.id as string);
      res.status(200).json({ success: true, message: 'Reward table deleted' });
    } catch (error) {
      next(error);
    }
  };
}