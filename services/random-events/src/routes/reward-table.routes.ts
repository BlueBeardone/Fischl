import { Router } from 'express';
import { RewardTableController } from '../controllers/reward-table.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateBody, validateParams } from '../middleware/validate.middleware';
import { createRewardTableSchema, updateRewardTableSchema, rewardTableIdSchema } from '../validators/reward-table.validator';

const router = Router();
const controller = new RewardTableController();

router.get('/', authenticate, controller.listAll);
router.get('/:id', authenticate, validateParams(rewardTableIdSchema), controller.getById);
router.post('/', authenticate, validateBody(createRewardTableSchema), controller.create);
router.put('/:id', authenticate, validateParams(rewardTableIdSchema), validateBody(createRewardTableSchema), controller.update);
router.patch('/:id', authenticate, validateParams(rewardTableIdSchema), validateBody(updateRewardTableSchema), controller.update);
router.delete('/:id', authenticate, validateParams(rewardTableIdSchema), controller.delete);

export { router as rewardTableRouter };