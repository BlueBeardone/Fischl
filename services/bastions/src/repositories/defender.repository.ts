import { DefenderModel } from '../models/defender.model';

export class DefenderRepository {
  async create(data: Record<string, unknown>) {
    const doc = await DefenderModel.create(data);
    return doc.toJSON();
  }

  async findAll() {
    const docs = await DefenderModel.find().exec();
    return docs.map(d => d.toJSON());
  }

  async findById(id: string) {
    const doc = await DefenderModel.findById(id).exec();
    return doc ? doc.toJSON() : null;
  }

  async findByBastionId(bastionId: string) {
    const docs = await DefenderModel.find({ bastionId }).exec();
    return docs.map(d => d.toJSON());
  }

  async update(id: string, data: Record<string, unknown>) {
    const doc = await DefenderModel.findByIdAndUpdate(id, data, { new: true }).exec();
    return doc ? doc.toJSON() : null;
  }

  async delete(id: string): Promise<void> {
    await DefenderModel.findByIdAndDelete(id).exec();
  }
}
