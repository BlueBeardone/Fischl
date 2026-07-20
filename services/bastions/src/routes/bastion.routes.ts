import { Router } from 'express';
import { BastionController } from '../controllers/bastion.controller';

const router = Router();
const controller = new BastionController();

router.get('/', controller.listAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router as bastionRouter };
