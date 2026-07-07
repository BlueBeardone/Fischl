import { BastionModel, IBastion } from '../models/bastion.model';

export class BastionRepository {
  async create(data: Partial<IBastion>): Promise<IBastion> {
    const bastion = await BastionModel.create(data);
    return bastion.toObject() as IBastion;
  }

  async findAll(): Promise<IBastion[]> {
    return BastionModel.find().lean().exec();
  }

  async findById(id: string): Promise<IBastion | null> {
    return BastionModel.findById(id).lean().exec();
  }

  async findByOwner(ownerId: string): Promise<IBastion[]> {
    return BastionModel.find({ ownerId }).lean().exec();
  }

  async update(id: string, data: Partial<IBastion>): Promise<IBastion | null> {
    return BastionModel.findByIdAndUpdate(id, data, { new: true }).lean().exec();
  }

  async delete(id: string): Promise<void> {
    await BastionModel.findByIdAndDelete(id).exec();
  }
}
