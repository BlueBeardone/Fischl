import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class UserController {
  constructor(private readonly authService = new AuthService()) {}

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.authService.getUserById(req.params.id as string);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.authService.updateUser(req.params.id as string, req.body);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  addRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roleName = (req.body as { role?: string }).role;
      if (!roleName) {
        res.status(400).json({ success: false, message: 'role is required' });
        return;
      }
      const user = await this.authService.addRole(req.params.id as string, roleName);
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  removeRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.authService.removeRole(req.params.id as string, req.params.name as string);
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };
}
