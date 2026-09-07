import { BastionRepository } from '../repositories/bastion.repository';
import { FacilityRepository } from '../repositories/facility.repository';
import { HirelingRepository } from '../repositories/hireling.repository';
import { DefenderRepository } from '../repositories/defender.repository';
import { isValidObjectId } from 'mongoose';
import { CreateBastionDto, UpdateBastionDto } from '../dtos/bastion.dto';
import { IFacility } from '../models/facility.model';
import { IHireling } from '../models/hireling.model';
import { IDefender } from '../models/defender.model';

export interface IAssembledBastion {
  id: string;
  userId: string;
  name: string;
  description: string;
  imgUrl?: string;
  facilities: IFacility[];
  defenders: IDefender[];
  hirelings: IHireling[];
}

export class BastionService {
  constructor(
    private readonly bastionRepository = new BastionRepository(),
    private readonly facilityRepository = new FacilityRepository(),
    private readonly hirelingRepository = new HirelingRepository(),
    private readonly defenderRepository = new DefenderRepository(),
  ) {}

  async create(userId: string, input: CreateBastionDto): Promise<IAssembledBastion> {
    this.validateInput(input);
    const bastion = await this.bastionRepository.create({
      userId,
      name: input.name,
      description: input.description,
      imgUrl: input.imgUrl,
    });
    if (input.facilities?.length) {
      const id = (bastion as Record<string, any>)._id?.toString() ?? (bastion as Record<string, any>).id;
      for (const facility of input.facilities) {
        const payload: Record<string, unknown> = {
          name: facility.name,
          rank: facility.rank,
          description: facility.description,
          imgUrl: facility.imgUrl,
          minimumRequiredHirelings: facility.minimumRequiredHirelings,
          constructionTurns: facility.constructionTurns,
          cost: facility.cost,
          table: facility.table,
          constructedTurns: facility.constructedTurns ?? 0,
          bastionId: id,
        };
        await this.facilityRepository.create(payload);
      }
    }
    return this.assembleBastion(bastion);
  }

  async listAll(userId: string): Promise<IAssembledBastion[]> {
    const bastions = await this.bastionRepository.findAll(userId);
    return Promise.all(bastions.map((b) => this.assembleBastion(b)));
  }

  async getById(id: string, userId: string): Promise<IAssembledBastion | null> {
    const bastion = await this.bastionRepository.findById(id, userId);
    if (!bastion) return null;
    return this.assembleBastion(bastion);
  }

  async update(id: string, input: UpdateBastionDto, userId: string): Promise<IAssembledBastion | null> {
    const data: Record<string, unknown> = {};
    if (input.name !== undefined) data.name = input.name;
    if (input.description !== undefined) data.description = input.description;
    if (input.imgUrl !== undefined) data.imgUrl = input.imgUrl;
    const bastion = await this.bastionRepository.update(id, data, userId);
    if (!bastion) return null;

    if (input.facilities?.length) {
      for (const facility of input.facilities) {
        const payload: Record<string, unknown> = {
          name: facility.name,
          rank: facility.rank,
          description: facility.description,
          imgUrl: facility.imgUrl,
          minimumRequiredHirelings: facility.minimumRequiredHirelings,
          constructionTurns: facility.constructionTurns,
          cost: facility.cost,
          table: facility.table,
          constructedTurns: facility.constructedTurns,
          bastionId: id,
        };
        const facilityId = facility.id && isValidObjectId(facility.id) ? facility.id : undefined;
        const existing = facilityId ? await this.facilityRepository.findById(facilityId) : null;
        if (existing && facilityId) {
          await this.facilityRepository.update(facilityId, payload);
        } else {
          await this.facilityRepository.create(payload);
        }
      }
    }

    return this.assembleBastion(bastion);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.bastionRepository.delete(id, userId);
  }

  private async assembleBastion(bastion: Record<string, any>): Promise<IAssembledBastion> {
    const id = bastion._id?.toString() ?? bastion.id;
    const [facilities, defenders, hirelings] = await Promise.all([
      this.facilityRepository.findByBastionId(id),
      this.defenderRepository.findByBastionId(id),
      this.hirelingRepository.findByBastionId(id),
    ]);

    return {
      id,
      userId: bastion.userId,
      name: bastion.name,
      description: bastion.description,
      imgUrl: bastion.imgUrl,
      facilities: facilities as unknown as IFacility[],
      defenders: defenders as unknown as IDefender[],
      hirelings: hirelings as unknown as IHireling[],
    };
  }

  private validateInput(input: CreateBastionDto): void {
    if (!input.name || input.name.trim().length < 3) {
      throw new Error('Bastion name must be at least 3 characters');
    }
  }
}