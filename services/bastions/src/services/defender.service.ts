import { DefenderRepository } from '../repositories/defender.repository';
import { CreateDefenderDto, UpdateDefenderDto } from '../dtos/defender.dto';
import { IDefender } from '../models/defender.model';
import { OwnershipService } from './ownership.service';
import { NotFoundError } from '../errors/http-errors';

export class DefenderService {
  constructor(
    private readonly repository = new DefenderRepository(),
    private readonly ownership = new OwnershipService()
  ) {}

  async create(input: CreateDefenderDto, userId: string): Promise<IDefender> {
    await this.ownership.assertBastionOwner(input.bastionId, userId);
    return this.repository.create(input as unknown as Record<string, unknown>) as unknown as IDefender;
  }

  async listAll(): Promise<IDefender[]> {
    return this.repository.findAll() as unknown as IDefender[];
  }

  async getById(id: string): Promise<IDefender | null> {
    return this.repository.findById(id) as unknown as IDefender | null;
  }

  async listByBastionId(bastionId: string): Promise<IDefender[]> {
    return this.repository.findByBastionId(bastionId) as unknown as IDefender[];
  }

  async update(id: string, input: UpdateDefenderDto, userId: string): Promise<IDefender | null> {
    const existing = await this.repository.findRawById(id);
    if (!existing) {
      return null;
    }
    await this.ownership.assertBastionOwner((existing as { bastionId: string }).bastionId, userId);
    const data: Record<string, unknown> = {};
    if (input.name !== undefined) data.name = input.name;
    if (input.description !== undefined) data.description = input.description;
    if (input.imgUrl !== undefined) data.imgUrl = input.imgUrl;
    if (input.type !== undefined) data.type = input.type;
    if (input.acquisitionStory !== undefined) data.acquisitionStory = input.acquisitionStory;
    return this.repository.update(id, data) as unknown as IDefender | null;
  }

  async delete(id: string, userId: string): Promise<void> {
    const existing = await this.repository.findRawById(id);
    if (!existing) {
      throw new NotFoundError('Defender not found');
    }
    await this.ownership.assertBastionOwner((existing as { bastionId: string }).bastionId, userId);
    await this.repository.delete(id);
  }
}
