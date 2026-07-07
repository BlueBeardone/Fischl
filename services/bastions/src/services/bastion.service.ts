import { BastionRepository } from '../repositories/bastion.repository';
import { CreateBastionDto, UpdateBastionDto } from '../dtos/bastion.dto';
import { IBastion } from '../models/bastion.model';

export class BastionService {
  constructor(private readonly bastionRepository = new BastionRepository()) {}

  async create(input: CreateBastionDto): Promise<IBastion> {
    this.validateInput(input);
    return this.bastionRepository.create(input);
  }

  async listAll(): Promise<IBastion[]> {
    return this.bastionRepository.findAll();
  }

  async getById(id: string): Promise<IBastion | null> {
    return this.bastionRepository.findById(id);
  }

  async listByOwner(ownerId: string): Promise<IBastion[]> {
    return this.bastionRepository.findByOwner(ownerId);
  }

  async update(id: string, input: UpdateBastionDto): Promise<IBastion | null> {
    return this.bastionRepository.update(id, input);
  }

  async delete(id: string): Promise<void> {
    await this.bastionRepository.delete(id);
  }

  private validateInput(input: CreateBastionDto): void {
    if (!input.name || input.name.trim().length < 3) {
      throw new Error('Bastion name must be at least 3 characters');
    }

    if (!input.ownerId) {
      throw new Error('ownerId is required');
    }
  }
}
