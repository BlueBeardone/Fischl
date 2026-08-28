import { Router } from 'express';
import { NewspaperArticleController } from '../controllers/newspaper-article.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { createNewspaperArticleSchema } from '../validators/newspaper-article.validator';

const router = Router();
const controller = new NewspaperArticleController();

router.get('/', authenticate, controller.listAll);
router.post('/', authenticate, validateBody(createNewspaperArticleSchema), controller.create);

export { router as newspaperRouter };
