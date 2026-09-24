import { HirelingRepository } from '../repositories/hireling.repository';
import { CreateHirelingDto, UpdateHirelingDto } from '../dtos/hireling.dto';
import { IHireling } from '../models/hireling.model';
import { OwnershipService } from './ownership.service';
import { NotFoundError } from '../errors/http-errors';

export class HirelingService {
  constructor(
    private readonly repository = new HirelingRepository(),
    private readonly ownership = new OwnershipService()
  ) {}

  async create(input: CreateHirelingDto, userId: string): Promise<IHireling> {
    await this.ownership.assertBastionOwner(input.bastionId, userId);
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

  async unassigned(bastionId: string): Promise<IHireling[]> {
    return this.repository.findUnassigned(bastionId) as unknown as IHireling[];
  }

  async byFacility(bastionId: string, facilityId: string): Promise<IHireling[]> {
    return this.repository.findByFacilityId(bastionId, facilityId) as unknown as IHireling[];
  }

  async update(id: string, input: UpdateHirelingDto, userId: string): Promise<IHireling | null> {
    const existing = await this.repository.findRawById(id);
    if (!existing) {
      return null;
    }
    await this.ownership.assertBastionOwner((existing as { bastionId: string }).bastionId, userId);
    const data: Record<string, unknown> = {};
    if (input.name !== undefined) data.name = input.name;
    if (input.role !== undefined) data.role = input.role;
    if (input.description !== undefined) data.description = input.description;
    if (input.imgUrl !== undefined) data.imgUrl = input.imgUrl;
    if (input.facilityId !== undefined) data.facilityId = input.facilityId;
    if (input.acquisitionStory !== undefined) data.acquisitionStory = input.acquisitionStory;
    return this.repository.update(id, data) as unknown as IHireling | null;
  }

  async delete(id: string, userId: string): Promise<void> {
    const existing = await this.repository.findRawById(id);
    if (!existing) {
      throw new NotFoundError('Hireling not found');
    }
    await this.ownership.assertBastionOwner((existing as { bastionId: string }).bastionId, userId);
    await this.repository.delete(id);
  }
}