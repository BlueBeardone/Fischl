import { ArticleRepository } from '../repositories/article.repository';
import { CreateArticleDto, UpdateArticleDto } from '../dtos/article.dto';
import { IArticle } from '../models/article.model';

export class ArticleService {
  constructor(private readonly articleRepository = new ArticleRepository()) {}

  async create(input: CreateArticleDto, ownerId: string): Promise<IArticle> {
    return this.articleRepository.create({ ...input, ownerId });
  }

  async listAll(): Promise<IArticle[]> {
    return this.articleRepository.findAll();
  }

  async getById(id: string): Promise<IArticle | null> {
    return this.articleRepository.findById(id);
  }

  async update(id: string, input: UpdateArticleDto): Promise<IArticle | null> {
    return this.articleRepository.update(id, input);
  }

  async delete(id: string): Promise<void> {
    await this.articleRepository.delete(id);
  }
}
