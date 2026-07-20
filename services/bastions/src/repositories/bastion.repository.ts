import { BastionModel } from '../models/bastion.model';

export class BastionRepository {
  async create(data: Record<string, unknown>) {
    const bastion = await BastionModel.create(data);
    return bastion.toObject();
  }

  async findAll() {
    return BastionModel.find().lean().exec();
  }

  async findById(id: string) {
    return BastionModel.findById(id).lean().exec();
  }

  async update(id: string, data: Record<string, unknown>) {
    return BastionModel.findByIdAndUpdate(id, data, { new: true }).lean().exec();
  }

  async delete(id: string): Promise<void> {
    await BastionModel.findByIdAndDelete(id).exec();
  }
}