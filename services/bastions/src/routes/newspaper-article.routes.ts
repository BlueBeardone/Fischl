import { Router } from 'express';
import { NewspaperArticleController } from '../controllers/newspaper-article.controller';
import { validateBody } from '../middleware/validate.middleware';
import { createNewspaperArticleSchema } from '../validators/newspaper-article.validator';

const router = Router();
const controller = new NewspaperArticleController();

router.get('/', controller.listAll);
router.get('/:id', controller.getById);
router.post('/', validateBody(createNewspaperArticleSchema), controller.create);
router.delete('/:id', controller.delete);

export { router as newspaperArticleRouter };
