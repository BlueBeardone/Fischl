import { NextFunction, Request, Response } from 'express';
import { FacilityService } from '../services/facility.service';

export class FacilityController {
  constructor(private readonly service = new FacilityService()) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const facility = await this.service.create(req.body);
      res.status(201).json({ success: true, data: facility });
    } catch (error) {
      next(error);
    }
  };

  listAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const facilities = await this.service.listAll();
      res.status(200).json({ success: true, data: facilities });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const facility = await this.service.update(req.params.id as string, req.body);
      if (!facility) {
        res.status(404).json({ success: false, message: 'Facility not found' });
        return;
      }
      res.status(200).json({ success: true, data: facility });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.delete(req.params.id as string);
      res.status(200).json({ success: true, message: 'Facility deleted' });
    } catch (error) {
      next(error);
    }
  };
}
