import { EventRepository } from '../repositories/event.repository';
import type { CreateEventDto, UpdateEventDto } from '../dtos/event.dto';

export class EventService {
  constructor(private readonly repository = new EventRepository()) {}

  async create(input: CreateEventDto) {
    return this.repository.create(input as unknown as Record<string, unknown>);
  }

  async listAll() {
    return this.repository.findAll();
  }

  async getById(id: string) {
    return this.repository.findById(id);
  }

  async update(id: string, input: UpdateEventDto) {
    return this.repository.update(id, input as unknown as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}