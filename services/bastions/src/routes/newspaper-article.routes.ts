import { Router } from 'express';
import { NewspaperArticleController } from '../controllers/newspaper-article.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/requireRole';
import { validateBody } from '../middleware/validate.middleware';
import { createNewspaperArticleSchema } from '../validators/newspaper-article.validator';

const ROLE_ADMIN = 'admin';

const router = Router();
const controller = new NewspaperArticleController();

router.use(authenticate);

router.get('/', controller.listAll);
router.get('/:id', controller.getById);
router.post('/', requireRole(ROLE_ADMIN), validateBody(createNewspaperArticleSchema), controller.create);
router.delete('/:id', requireRole(ROLE_ADMIN), controller.delete);

export { router as newspaperArticleRouter };
