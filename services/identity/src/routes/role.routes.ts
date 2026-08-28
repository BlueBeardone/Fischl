import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/requireRole';
import { ROLE_ADMIN } from '../constants/roles';

const router = Router();
const controller = new RoleController();

router.use(authenticate, requireRole(ROLE_ADMIN));

router.get('/roles', controller.list);
router.post('/roles', controller.create);
router.get('/roles/:name', controller.get);
router.patch('/roles/:name', controller.update);
router.delete('/roles/:name', controller.remove);

export { router as roleRouter };
