import { Router } from 'express';
import { DefenderController } from '../controllers/defender.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const controller = new DefenderController();

router.use(authenticate);

router.get('/', controller.listAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router as defenderRouter };
