import { Router } from 'express';
import { BastionController } from '../controllers/bastion.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const controller = new BastionController();

router.get('/', authenticate, controller.listAll);
router.get('/:id', authenticate, controller.getById);
router.post('/', authenticate, controller.create);
router.put('/:id', authenticate, controller.update);
router.patch('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.delete);

export { router as bastionRouter };
