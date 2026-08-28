import { NextFunction, Request, Response } from 'express';
import { AppService } from '../services/app.service';

export class AppController {
  constructor(private readonly appService = new AppService()) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const app = await this.appService.create(req.body);
      res.status(201).json({ success: true, data: app });
    } catch (error) {
      next(error);
    }
  };

  list = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const apps = await this.appService.list();
      res.status(200).json({ success: true, data: apps });
    } catch (error) {
      next(error);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const app = await this.appService.get(req.params.slug as string);
      res.status(200).json({ success: true, data: app });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const app = await this.appService.update(req.params.slug as string, req.body);
      res.status(200).json({ success: true, data: app });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.appService.remove(req.params.slug as string);
      res.status(200).json({ success: true, data: null });
    } catch (error) {
      next(error);
    }
  };
}