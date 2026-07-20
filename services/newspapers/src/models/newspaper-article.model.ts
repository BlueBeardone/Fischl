import { Schema, model } from 'mongoose';

export interface INewspaperArticle {
  title: string;
  content: string;
  imageUrl?: string;
  author?: string;
}

const newspaperArticleSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    author: { type: String },
    createdAt: { type: Date, expires: '7d' },
  },
  { timestamps: true }
);

export const NewspaperArticleModel = model<INewspaperArticle>('NewspaperArticle', newspaperArticleSchema);