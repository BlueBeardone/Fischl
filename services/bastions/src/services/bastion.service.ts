import { BastionRepository } from '../repositories/bastion.repository';
import { FacilityRepository } from '../repositories/facility.repository';
import { HirelingRepository } from '../repositories/hireling.repository';
import { DefenderRepository } from '../repositories/defender.repository';
import { CreateBastionDto, UpdateBastionDto } from '../dtos/bastion.dto';
import { IFacility } from '../models/facility.model';
import { IHireling } from '../models/hireling.model';
import { IDefender } from '../models/defender.model';

export interface IAssembledBastion {
  id: string;
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

  async create(input: CreateBastionDto): Promise<IAssembledBastion> {
    this.validateInput(input);
    const bastion = await this.bastionRepository.create(input as unknown as Record<string, unknown>);
    return this.assembleBastion(bastion);
  }

  async listAll(): Promise<IAssembledBastion[]> {
    const bastions = await this.bastionRepository.findAll();
    return Promise.all(bastions.map((b) => this.assembleBastion(b)));
  }

  async getById(id: string): Promise<IAssembledBastion | null> {
    const bastion = await this.bastionRepository.findById(id);
    if (!bastion) return null;
    return this.assembleBastion(bastion);
  }

  async update(id: string, input: UpdateBastionDto): Promise<IAssembledBastion | null> {
    const bastion = await this.bastionRepository.update(id, input as unknown as Record<string, unknown>);
    if (!bastion) return null;
    return this.assembleBastion(bastion);
  }

  async delete(id: string): Promise<void> {
    await this.bastionRepository.delete(id);
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
