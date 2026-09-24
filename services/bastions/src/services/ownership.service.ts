import { BastionRepository } from '../repositories/bastion.repository';
import { NotFoundError } from '../errors/http-errors';

export class OwnershipService {
  constructor(private readonly bastionRepository = new BastionRepository()) {}

  async assertBastionOwner(bastionId: string, userId: string): Promise<void> {
    if (!bastionId) {
      throw new NotFoundError('Bastion not found');
    }
    const bastion = await this.bastionRepository.findById(bastionId, userId);
    if (!bastion) {
      throw new NotFoundError('Bastion not found');
    }
  }
}
