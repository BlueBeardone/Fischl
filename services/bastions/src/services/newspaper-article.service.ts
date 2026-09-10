import { NewspaperArticleRepository } from '../repositories/newspaper-article.repository';
import { CreateNewspaperArticleDto, UpdateNewspaperArticleDto } from '../dtos/newspaper-article.dto';
import { INewspaperArticle } from '../models/newspaper-article.model';

export class NewspaperArticleService {
  constructor(private readonly repository = new NewspaperArticleRepository()) {}

  async create(input: CreateNewspaperArticleDto): Promise<INewspaperArticle> {
    return this.repository.create(input as unknown as Record<string, unknown>) as unknown as INewspaperArticle;
  }

  async listAll(): Promise<INewspaperArticle[]> {
    return this.repository.findAll() as unknown as INewspaperArticle[];
  }

  async getById(id: string): Promise<INewspaperArticle | null> {
    return this.repository.findById(id) as unknown as INewspaperArticle | null;
  }

  async listByBastionId(bastionId: string): Promise<INewspaperArticle[]> {
    return this.repository.findByBastionId(bastionId) as unknown as INewspaperArticle[];
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
