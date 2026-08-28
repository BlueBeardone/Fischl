import { NextFunction, Response } from 'express';
import { EventService } from '../services/event.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class EventController {
  constructor(private readonly service = new EventService(), private readonly label = 'Event') {}

  create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const event = await this.service.create(req.body);
      res.status(201).json({ success: true, data: event });
    } catch (error) {
      next(error);
    }
  };

  listAll = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const events = await this.service.listAll();
      res.status(200).json({ success: true, data: events });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const event = await this.service.getById(req.params.id as string);
      if (!event) {
        res.status(404).json({ success: false, message: `${this.label} not found` });
        return;
      }
      res.status(200).json({ success: true, data: event });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const event = await this.service.update(req.params.id as string, req.body);
      if (!event) {
        res.status(404).json({ success: false, message: `${this.label} not found` });
        return;
      }
      res.status(200).json({ success: true, data: event });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.delete(req.params.id as string);
      res.status(200).json({ success: true, message: `${this.label} deleted` });
    } catch (error) {
      next(error);
    }
  };
}