import { Schema, model } from 'mongoose';

export interface IHireling {
  id: string;
  name: string;
  role?: string;
  description?: string;
  imgUrl?: string;
  bastionId: string;
  facilityId?: string;
  acquisitionStory?: string;
}

const hirelingSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    description: { type: String, trim: true },
    imgUrl: { type: String },
    bastionId: { type: String, required: true },
    facilityId: { type: String },
    acquisitionStory: { type: String },
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

hirelingSchema.virtual('id').get(function () {
  return this._id.toString();
});

export const HirelingModel = model('Hireling', hirelingSchema);
