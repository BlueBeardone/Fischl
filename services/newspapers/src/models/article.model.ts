import { Schema, model } from 'mongoose';

export interface IArticle {
  _id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  author?: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const articleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    author: { type: String, default: null },
    ownerId: { type: String, required: true }
  },
  { timestamps: true }
);

export const ArticleModel = model<IArticle>('Article', articleSchema);
