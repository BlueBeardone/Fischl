import { AppModel, IApp } from '../models/app.model';

export class AppRepository {
  async create(data: Partial<IApp>): Promise<IApp> {
    const app = await AppModel.create(data);
    return app.toObject() as IApp;
  }

  async findAll(): Promise<IApp[]> {
    return AppModel.find().lean().exec();
  }

  async findBySlug(slug: string): Promise<IApp | null> {
    return AppModel.findOne({ slug }).lean().exec();
  }

  async findById(id: string): Promise<IApp | null> {
    return AppModel.findById(id).lean().exec();
  }

  async update(slug: string, data: Partial<IApp>): Promise<IApp | null> {
    return AppModel.findOneAndUpdate({ slug }, data, { new: true }).lean().exec();
  }

  async deleteBySlug(slug: string): Promise<IApp | null> {
    return AppModel.findOneAndDelete({ slug }).lean().exec();
  }
}