import { RewardTableModel } from '../models/reward-table.model';

export class RewardTableRepository {
  async create(data: Record<string, unknown>) {
    const doc = await RewardTableModel.create(data);
    return doc.toJSON();
  }

  async findAll() {
    const docs = await RewardTableModel.find().exec();
    return docs.map((d) => d.toJSON());
  }

  async findById(id: string) {
    const doc = await RewardTableModel.findById(id).exec();
    return doc ? doc.toJSON() : null;
  }

  async update(id: string, data: Record<string, unknown>) {
    const doc = await RewardTableModel.findByIdAndUpdate(id, data, { new: true }).exec();
    return doc ? doc.toJSON() : null;
  }

  async delete(id: string): Promise<void> {
    await RewardTableModel.findByIdAndDelete(id).exec();
  }
}