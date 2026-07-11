export interface CreateArticleDto {
  title: string;
  content: string;
  imageUrl?: string;
  author?: string;
}

export interface UpdateArticleDto {
  title?: string;
  content?: string;
  imageUrl?: string;
  author?: string;
}
