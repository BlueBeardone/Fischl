import { ArticleModel, IArticle } from '../models/article.model';

export class ArticleRepository {
  async create(data: Partial<IArticle>): Promise<IArticle> {
    const article = await ArticleModel.create(data);
    return article.toObject() as IArticle;
  }

  async findAll(): Promise<IArticle[]> {
    return ArticleModel.find().sort({ createdAt: -1 }).lean().exec();
  }

  async findById(id: string): Promise<IArticle | null> {
    return ArticleModel.findById(id).lean().exec();
  }

  async update(id: string, data: Partial<IArticle>): Promise<IArticle | null> {
    return ArticleModel.findByIdAndUpdate(id, data, { new: true }).lean().exec();
  }

  async delete(id: string): Promise<void> {
    await ArticleModel.findByIdAndDelete(id).exec();
  }
}
