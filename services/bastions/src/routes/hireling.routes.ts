import { Router } from 'express';
import { HirelingController } from '../controllers/hireling.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const controller = new HirelingController();

router.use(authenticate);

router.get('/', controller.listAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router as hirelingRouter };