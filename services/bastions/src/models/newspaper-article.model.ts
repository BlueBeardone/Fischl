import { Schema, model } from 'mongoose';

export interface INewspaperArticle {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author?: string;
  bastionId: string;
}

const newspaperArticleSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    author: { type: String },
    bastionId: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

newspaperArticleSchema.virtual('id').get(function () {
  return this._id.toString();
});

newspaperArticleSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

export const NewspaperArticleModel = model<INewspaperArticle>('NewspaperArticle', newspaperArticleSchema);
