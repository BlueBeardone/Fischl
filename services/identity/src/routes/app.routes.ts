import { Router } from 'express';
import { AppController } from '../controllers/app.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/requireRole';
import { ROLE_ADMIN } from '../constants/roles';

const router = Router();
const controller = new AppController();

router.use(authenticate, requireRole(ROLE_ADMIN));

router.get('/apps', controller.list);
router.post('/apps', controller.create);
router.get('/apps/:slug', controller.get);
router.patch('/apps/:slug', controller.update);
router.delete('/apps/:slug', controller.remove);

export { router as appRouter };