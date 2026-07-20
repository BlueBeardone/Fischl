import { FacilityRepository } from '../repositories/facility.repository';
import { CreateFacilityDto, UpdateFacilityDto } from '../dtos/facility.dto';
import { IFacility } from '../models/facility.model';

export class FacilityService {
  constructor(private readonly repository = new FacilityRepository()) {}

  async create(input: CreateFacilityDto): Promise<IFacility> {
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

  async update(id: string, input: UpdateFacilityDto): Promise<IFacility | null> {
    return this.repository.update(id, input as unknown as Record<string, unknown>) as unknown as IFacility | null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
