import { NextFunction, Request, Response } from 'express';
import { ArticleService } from '../services/article.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class ArticleController {
  constructor(private readonly articleService = new ArticleService()) {}

  create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const article = await this.articleService.create(req.body, req.userId!);
      res.status(201).json({ success: true, data: article });
    } catch (error) {
      next(error);
    }
  };

  listAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const articles = await this.articleService.listAll();
      res.status(200).json({ success: true, data: articles });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const article = await this.articleService.getById(req.params.id as string);
      if (!article) {
        res.status(404).json({ success: false, message: 'Article not found' });
        return;
      }
      res.status(200).json({ success: true, data: article });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const article = await this.articleService.getById(req.params.id as string);
      if (!article) {
        res.status(404).json({ success: false, message: 'Article not found' });
        return;
      }
      if (article.ownerId !== req.userId) {
        res.status(403).json({ success: false, message: 'Forbidden' });
        return;
      }
      const updated = await this.articleService.update(req.params.id as string, req.body);
      res.status(200).json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const article = await this.articleService.getById(req.params.id as string);
      if (!article) {
        res.status(404).json({ success: false, message: 'Article not found' });
        return;
      }
      if (article.ownerId !== req.userId) {
        res.status(403).json({ success: false, message: 'Forbidden' });
        return;
      }
      await this.articleService.delete(req.params.id as string);
      res.status(200).json({ success: true, message: 'Article deleted' });
    } catch (error) {
      next(error);
    }
  };
}