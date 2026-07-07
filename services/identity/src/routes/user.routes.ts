import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const controller = new UserController();

router.get('/users/:id', controller.getById);
router.patch('/users/:id', controller.update);

export { router as userRouter };
