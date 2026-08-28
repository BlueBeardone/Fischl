import { NextFunction, Request, Response } from 'express';
import { RoleService } from '../services/role.service';

export class RoleController {
  constructor(private readonly roleService = new RoleService()) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const role = await this.roleService.create(req.body);
      res.status(201).json({ success: true, data: role });
    } catch (error) {
      next(error);
    }
  };

  list = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roles = await this.roleService.list();
      res.status(200).json({ success: true, data: roles });
    } catch (error) {
      next(error);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const role = await this.roleService.get(req.params.name as string);
      res.status(200).json({ success: true, data: role });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const role = await this.roleService.update(req.params.name as string, req.body);
      res.status(200).json({ success: true, data: role });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.roleService.remove(req.params.name as string);
      res.status(200).json({ success: true, data: null });
    } catch (error) {
      next(error);
    }
  };
}
