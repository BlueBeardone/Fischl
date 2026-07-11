import { Router } from 'express';
import { ArticleController } from '../controllers/article.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateBody, validateParams } from '../middleware/validate.middleware';
import { createArticleSchema, updateArticleSchema, articleIdSchema } from '../validators/article.validator';

const router = Router();
const controller = new ArticleController();

router.get('/', authenticate, controller.listAll);
router.get('/:id', authenticate, validateParams(articleIdSchema), controller.getById);
router.post('/', authenticate, validateBody(createArticleSchema), controller.create);
router.patch('/:id', authenticate, validateParams(articleIdSchema), validateBody(updateArticleSchema), controller.update);
router.delete('/:id', authenticate, validateParams(articleIdSchema), controller.delete);

export { router as articleRouter };
