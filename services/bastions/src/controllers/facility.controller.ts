import { NextFunction, Response } from 'express';
import { FacilityService } from '../services/facility.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class FacilityController {
  constructor(private readonly service = new FacilityService()) {}

  create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const facility = await this.service.create(req.body, req.userId!);
      res.status(201).json({ success: true, data: facility });
    } catch (error) {
      next(error);
    }
  };

  listAll = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const facilities = await this.service.listAll();
      res.status(200).json({ success: true, data: facilities });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const facility = await this.service.getById(req.params.id as string);
      if (!facility) {
        res.status(404).json({ success: false, message: 'Facility not found' });
        return;
      }
      res.status(200).json({ success: true, data: facility });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const facility = await this.service.update(req.params.id as string, req.body, req.userId!);
      if (!facility) {
        res.status(404).json({ success: false, message: 'Facility not found' });
        return;
      }
      res.status(200).json({ success: true, data: facility });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.delete(req.params.id as string, req.userId!);
      res.status(200).json({ success: true, message: 'Facility deleted' });
    } catch (error) {
      next(error);
    }
  };
}