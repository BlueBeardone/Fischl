import type { Model } from 'mongoose';
import { BastionIndividualEventModel } from '../models/event.model';

export class EventRepository {
  constructor(private readonly model: Model<any> = BastionIndividualEventModel) {}

  async create(data: Record<string, unknown>) {
    const doc = await this.model.create(data);
    return doc.toJSON();
  }

  async findAll() {
    const docs = await this.model.find().sort({ 'rollRange.min': 1 }).exec();
    return docs.map((d) => d.toJSON());
  }

  async findById(id: string) {
    const doc = await this.model.findById(id).exec();
    return doc ? doc.toJSON() : null;
  }

  async update(id: string, data: Record<string, unknown>) {
    const doc = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    return doc ? doc.toJSON() : null;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}