import { HirelingRepository } from '../repositories/hireling.repository';
import { CreateHirelingDto, UpdateHirelingDto } from '../dtos/hireling.dto';
import { IHireling } from '../models/hireling.model';

export class HirelingService {
  constructor(private readonly repository = new HirelingRepository()) {}

  async create(input: CreateHirelingDto): Promise<IHireling> {
    return this.repository.create(input as unknown as Record<string, unknown>) as unknown as IHireling;
  }

  async listAll(): Promise<IHireling[]> {
    return this.repository.findAll() as unknown as IHireling[];
  }

  async getById(id: string): Promise<IHireling | null> {
    return this.repository.findById(id) as unknown as IHireling | null;
  }

  async listByBastionId(bastionId: string): Promise<IHireling[]> {
    return this.repository.findByBastionId(bastionId) as unknown as IHireling[];
  }

  async update(id: string, input: UpdateHirelingDto): Promise<IHireling | null> {
    return this.repository.update(id, input as unknown as Record<string, unknown>) as unknown as IHireling | null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
