import { FacilityModel } from '../models/facility.model';

export class FacilityRepository {
  async create(data: Record<string, unknown>) {
    const facility = await FacilityModel.create(data);
    return facility.toJSON();
  }

  async findAll() {
    const docs = await FacilityModel.find().exec();
    return docs.map(d => d.toJSON());
  }

  async findById(id: string) {
    const doc = await FacilityModel.findById(id).exec();
    return doc ? doc.toJSON() : null;
  }

  async findByBastionId(bastionId: string) {
    const docs = await FacilityModel.find({ bastionId }).exec();
    return docs.map(d => d.toJSON());
  }

  async update(id: string, data: Record<string, unknown>) {
    const doc = await FacilityModel.findByIdAndUpdate(id, data, { new: true }).exec();
    return doc ? doc.toJSON() : null;
  }

  async delete(id: string): Promise<void> {
    await FacilityModel.findByIdAndDelete(id).exec();
  }
}