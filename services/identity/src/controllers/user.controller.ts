import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class UserController {
  constructor(private readonly authService = new AuthService()) {}

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.authService.getUserById(req.params.id);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.authService.updateUser(req.params.id, req.body);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };
}
