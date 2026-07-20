import { Router } from 'express';
import { DefenderController } from '../controllers/defender.controller';

const router = Router();
const controller = new DefenderController();

router.get('/', controller.listAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router as defenderRouter };