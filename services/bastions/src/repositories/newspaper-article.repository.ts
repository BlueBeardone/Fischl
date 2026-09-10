import { NewspaperArticleModel } from '../models/newspaper-article.model';

export class NewspaperArticleRepository {
  async create(data: Record<string, unknown>) {
    const doc = await NewspaperArticleModel.create(data);
    return doc.toJSON();
  }

  async findAll() {
    const docs = await NewspaperArticleModel.find().sort({ createdAt: -1 }).exec();
    return docs.map(d => d.toJSON());
  }

  async findById(id: string) {
    const doc = await NewspaperArticleModel.findById(id).exec();
    return doc ? doc.toJSON() : null;
  }

  async findByBastionId(bastionId: string) {
    const docs = await NewspaperArticleModel.find({ bastionId }).sort({ createdAt: -1 }).exec();
    return docs.map(d => d.toJSON());
  }

  async delete(id: string): Promise<void> {
    await NewspaperArticleModel.findByIdAndDelete(id).exec();
  }
}
