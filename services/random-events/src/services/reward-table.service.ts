import { RewardTableRepository } from '../repositories/reward-table.repository';
import type { CreateRewardTableDto, UpdateRewardTableDto } from '../dtos/reward-table.dto';

export class RewardTableService {
  constructor(private readonly repository = new RewardTableRepository()) {}

  async create(input: CreateRewardTableDto) {
    return this.repository.create(input as unknown as Record<string, unknown>);
  }

  async listAll() {
    return this.repository.findAll();
  }

  async getById(id: string) {
    return this.repository.findById(id);
  }

  async update(id: string, input: UpdateRewardTableDto) {
    return this.repository.update(id, input as unknown as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}