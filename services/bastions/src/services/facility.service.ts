import { FacilityRepository } from '../repositories/facility.repository';
import { CreateFacilityDto, UpdateFacilityDto } from '../dtos/facility.dto';
import { IFacility } from '../models/facility.model';
import { OwnershipService } from './ownership.service';
import { NotFoundError } from '../errors/http-errors';

export class FacilityService {
  constructor(
    private readonly repository = new FacilityRepository(),
    private readonly ownership = new OwnershipService()
  ) {}

  async create(input: CreateFacilityDto, userId: string): Promise<IFacility> {
    await this.ownership.assertBastionOwner(input.bastionId, userId);
    return this.repository.create(input as unknown as Record<string, unknown>) as unknown as IFacility;
  }

  async listAll(): Promise<IFacility[]> {
    return this.repository.findAll() as unknown as IFacility[];
  }

  async getById(id: string): Promise<IFacility | null> {
    return this.repository.findById(id) as unknown as IFacility | null;
  }

  async listByBastionId(bastionId: string): Promise<IFacility[]> {
    return this.repository.findByBastionId(bastionId) as unknown as IFacility[];
  }

  async update(id: string, input: UpdateFacilityDto, userId: string): Promise<IFacility | null> {
    const existing = await this.repository.findRawById(id);
    if (!existing) {
      return null;
    }
    await this.ownership.assertBastionOwner((existing as { bastionId: string }).bastionId, userId);
    const data: Record<string, unknown> = {};
    if (input.name !== undefined) data.name = input.name;
    if (input.rank !== undefined) data.rank = input.rank;
    if (input.description !== undefined) data.description = input.description;
    if (input.imgUrl !== undefined) data.imgUrl = input.imgUrl;
    if (input.minimumRequiredHirelings !== undefined) data.minimumRequiredHirelings = input.minimumRequiredHirelings;
    if (input.constructionTurns !== undefined) data.constructionTurns = input.constructionTurns;
    if (input.cost !== undefined) data.cost = input.cost;
    if (input.table !== undefined) data.table = input.table;
    if (input.constructedTurns !== undefined) data.constructedTurns = input.constructedTurns;
    return this.repository.update(id, data) as unknown as IFacility | null;
  }

  async delete(id: string, userId: string): Promise<void> {
    const existing = await this.repository.findRawById(id);
    if (!existing) {
      throw new NotFoundError('Facility not found');
    }
    await this.ownership.assertBastionOwner((existing as { bastionId: string }).bastionId, userId);
    await this.repository.delete(id);
  }
}