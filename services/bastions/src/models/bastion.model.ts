import { Schema, model } from 'mongoose';

export interface IBastion {
  id: string;
  userId: string;
  name: string;
  description: string;
  imgUrl?: string;
}

const bastionSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imgUrl: { type: String },
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

bastionSchema.virtual('id').get(function () {
  return this._id.toString();
});

export const BastionModel = model('Bastion', bastionSchema);