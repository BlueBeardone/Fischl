import { NewspaperArticleRepository } from '../repositories/newspaper-article.repository';
import { CreateNewspaperArticleDto } from '../dtos/newspaper-article.dto';
import { INewspaperArticle } from '../models/newspaper-article.model';

export class NewspaperArticleService {
  constructor(private readonly repository = new NewspaperArticleRepository()) {}

  async create(input: CreateNewspaperArticleDto): Promise<INewspaperArticle> {
    return this.repository.create(input);
  }

  async listAll(): Promise<INewspaperArticle[]> {
    return this.repository.findAll();
  }
}
