import { NextFunction, Request, Response } from 'express';
import { NewspaperArticleService } from '../services/newspaper-article.service';

export class NewspaperArticleController {
  constructor(private readonly service = new NewspaperArticleService()) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const article = await this.service.create(req.body);
      res.status(201).json({ success: true, data: article });
    } catch (error) {
      next(error);
    }
  };

  listAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const articles = await this.service.listAll();
      res.status(200).json({ success: true, data: articles });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const article = await this.service.getById(req.params.id as string);
      if (!article) {
        res.status(404).json({ success: false, message: 'Newspaper article not found' });
        return;
      }
      res.status(200).json({ success: true, data: article });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.delete(req.params.id as string);
      res.status(200).json({ success: true, message: 'Newspaper article deleted' });
    } catch (error) {
      next(error);
    }
  };
}
