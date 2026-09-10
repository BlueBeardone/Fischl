export interface CreateNewspaperArticleDto {
  title: string;
  content: string;
  imageUrl?: string;
  author?: string;
  bastionId: string;
}

export interface UpdateNewspaperArticleDto {
  title?: string;
  content?: string;
  imageUrl?: string;
  author?: string;
}
