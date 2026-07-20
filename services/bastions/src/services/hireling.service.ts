import { HirelingRepository } from '../repositories/hireling.repository';
import { CreateHirelingDto, UpdateHirelingDto } from '../dtos/hireling.dto';
import { IHireling } from '../models/hireling.model';

export class HirelingService {
  constructor(private readonly repository = new HirelingRepository()) {}

  async create(input: CreateHirelingDto): Promise<IHireling> {
    return this.repository.create(input as Record<string, unknown>);
  }

  async listAll(): Promise<IHireling[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<IHireling | null> {
    return this.repository.findById(id);
  }

  async listByBastionId(bastionId: string): Promise<IHireling[]> {
    return this.repository.findByBastionId(bastionId);
  }

  async update(id: string, input: UpdateHirelingDto): Promise<IHireling | null> {
    return this.repository.update(id, input as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}