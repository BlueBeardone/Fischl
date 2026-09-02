import { Router } from 'express';
import { FacilityController } from '../controllers/facility.controller';

const router = Router();
const controller = new FacilityController();

router.get('/', controller.listAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router as facilityRouter };
