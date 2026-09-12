import { BastionModel } from '../models/bastion.model';

export class BastionRepository {
  async create(data: Record<string, unknown>) {
    const bastion = await BastionModel.create(data);
    return bastion.toJSON();
  }

  async findAll(userId?: string) {
    const filter = userId ? { userId } : {};
    const docs = await BastionModel.find(filter).exec();
    return docs.map(d => d.toJSON());
  }

  async findById(id: string, userId: string) {
    const doc = await BastionModel.findOne({ _id: id, userId }).exec();
    return doc ? doc.toJSON() : null;
  }

  async update(id: string, data: Record<string, unknown>, userId: string) {
    const doc = await BastionModel.findOneAndUpdate({ _id: id, userId }, data, { new: true }).exec();
    return doc ? doc.toJSON() : null;
  }

  async delete(id: string, userId: string): Promise<void> {
    await BastionModel.findOneAndDelete({ _id: id, userId }).exec();
  }
}