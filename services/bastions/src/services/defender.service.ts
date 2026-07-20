import { DefenderRepository } from '../repositories/defender.repository';
import { CreateDefenderDto, UpdateDefenderDto } from '../dtos/defender.dto';
import { IDefender } from '../models/defender.model';

export class DefenderService {
  constructor(private readonly repository = new DefenderRepository()) {}

  async create(input: CreateDefenderDto): Promise<IDefender> {
    return this.repository.create(input as Record<string, unknown>);
  }

  async listAll(): Promise<IDefender[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<IDefender | null> {
    return this.repository.findById(id);
  }

  async listByBastionId(bastionId: string): Promise<IDefender[]> {
    return this.repository.findByBastionId(bastionId);
  }

  async update(id: string, input: UpdateDefenderDto): Promise<IDefender | null> {
    return this.repository.update(id, input as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}