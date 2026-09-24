import { HirelingModel } from '../models/hireling.model';

export class HirelingRepository {
  async create(data: Record<string, unknown>) {
    const doc = await HirelingModel.create(data);
    return doc.toJSON();
  }

  async findAll() {
    const docs = await HirelingModel.find().exec();
    return docs.map(d => d.toJSON());
  }

  async findById(id: string) {
    const doc = await HirelingModel.findById(id).exec();
    return doc ? doc.toJSON() : null;
  }

  async findRawById(id: string) {
    return HirelingModel.findById(id).lean().exec();
  }

  async findByBastionId(bastionId: string) {
    const docs = await HirelingModel.find({ bastionId }).exec();
    return docs.map(d => d.toJSON());
  }

  async findUnassigned(bastionId: string) {
    const docs = await HirelingModel.find({ bastionId, facilityId: null }).exec();
    return docs.map(d => d.toJSON());
  }

  async findByFacilityId(bastionId: string, facilityId: string) {
    const docs = await HirelingModel.find({ bastionId, facilityId }).exec();
    return docs.map(d => d.toJSON());
  }

  async update(id: string, data: Record<string, unknown>) {
    const doc = await HirelingModel.findByIdAndUpdate(id, data, { new: true }).exec();
    return doc ? doc.toJSON() : null;
  }

  async delete(id: string): Promise<void> {
    await HirelingModel.findByIdAndDelete(id).exec();
  }
}
