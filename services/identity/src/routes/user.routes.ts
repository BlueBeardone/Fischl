import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/requireRole';
import { ROLE_ADMIN } from '../constants/roles';

const router = Router();
const controller = new UserController();

router.get('/users/:id', controller.getById);
router.patch('/users/:id', controller.update);
router.post('/users/:id/roles', authenticate, requireRole(ROLE_ADMIN), controller.addRole);
router.delete('/users/:id/roles/:name', authenticate, requireRole(ROLE_ADMIN), controller.removeRole);

export { router as userRouter };
