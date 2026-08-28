import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const controller = new AuthController();

router.post('/auth/register', controller.register);
router.post('/auth/login', controller.login);
router.post('/auth/login/username', controller.loginByUsername);
router.get('/auth/me', authenticate, controller.me);

export { router as authRouter };
