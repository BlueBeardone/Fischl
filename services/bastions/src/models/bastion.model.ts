import { Schema, model } from 'mongoose';

export interface IBastion {
  id: string;
  name: string;
  description: string;
  imgUrl?: string;
}

const bastionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imgUrl: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc: any, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const BastionModel = model('Bastion', bastionSchema);