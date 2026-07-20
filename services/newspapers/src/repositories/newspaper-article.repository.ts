import { NewspaperArticleModel, INewspaperArticle } from '../models/newspaper-article.model';

export class NewspaperArticleRepository {
  async create(data: Partial<INewspaperArticle>): Promise<INewspaperArticle> {
    const article = await NewspaperArticleModel.create(data);
    return article.toObject() as INewspaperArticle;
  }

  async findAll(): Promise<INewspaperArticle[]> {
    return NewspaperArticleModel.find().sort({ createdAt: -1 }).lean().exec();
  }

  async delete(id: string): Promise<void> {
    await NewspaperArticleModel.findByIdAndDelete(id).exec();
  }
}