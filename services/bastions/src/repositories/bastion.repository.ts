import { BastionModel } from '../models/bastion.model';

export class BastionRepository {
  async create(data: Record<string, unknown>) {
    const bastion = await BastionModel.create(data);
    return bastion.toJSON();
  }

  async findAll() {
    const docs = await BastionModel.find().exec();
    return docs.map(d => d.toJSON());
  }

  async findById(id: string) {
    const doc = await BastionModel.findById(id).exec();
    return doc ? doc.toJSON() : null;
  }

  async update(id: string, data: Record<string, unknown>) {
    const doc = await BastionModel.findByIdAndUpdate(id, data, { new: true }).exec();
    return doc ? doc.toJSON() : null;
  }

  async delete(id: string): Promise<void> {
    await BastionModel.findByIdAndDelete(id).exec();
  }
}