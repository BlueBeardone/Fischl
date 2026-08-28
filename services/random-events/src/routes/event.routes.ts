import { Router } from 'express';
import { EventController } from '../controllers/event.controller';
import { EventRepository } from '../repositories/event.repository';
import { EventService } from '../services/event.service';
import { createEventModel } from '../models/event.model';
import { authenticate } from '../middleware/auth.middleware';
import { validateBody, validateParams } from '../middleware/validate.middleware';
import { createEventSchema, updateEventSchema, eventIdSchema } from '../validators/event.validator';

export interface EventFamilyOptions {
  collection: string;
  label?: string;
}

export const createEventsRouter = (options: EventFamilyOptions): Router => {
  const model = createEventModel(options.collection);
  const controller = new EventController(new EventService(new EventRepository(model)), options.label ?? 'Event');
  const router = Router();

  router.get('/', authenticate, controller.listAll);
  router.get('/:id', authenticate, validateParams(eventIdSchema), controller.getById);
  router.post('/', authenticate, validateBody(createEventSchema), controller.create);
  router.put('/:id', authenticate, validateParams(eventIdSchema), validateBody(createEventSchema), controller.update);
  router.patch('/:id', authenticate, validateParams(eventIdSchema), validateBody(updateEventSchema), controller.update);
  router.delete('/:id', authenticate, validateParams(eventIdSchema), controller.delete);

  return router;
};