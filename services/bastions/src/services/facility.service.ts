import { FacilityRepository } from '../repositories/facility.repository';
import { CreateFacilityDto, UpdateFacilityDto } from '../dtos/facility.dto';
import { IFacility } from '../models/facility.model';

export class FacilityService {
  constructor(private readonly repository = new FacilityRepository()) {}

  async create(input: CreateFacilityDto): Promise<IFacility> {
    return this.repository.create(input as Record<string, unknown>);
  }

  async listAll(): Promise<IFacility[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<IFacility | null> {
    return this.repository.findById(id);
  }

  async listByBastionId(bastionId: string): Promise<IFacility[]> {
    return this.repository.findByBastionId(bastionId);
  }

  async update(id: string, input: UpdateFacilityDto): Promise<IFacility | null> {
    return this.repository.update(id, input as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}