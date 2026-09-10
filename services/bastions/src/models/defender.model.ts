import { Schema, model } from 'mongoose';
import type { DefenderType } from '../../../../shared/types';

export interface IDefender {
  id: string;
  name?: string;
  description?: string;
  imgUrl?: string;
  type: DefenderType;
  bastionId: string;
  acquisitionStory?: string;
}

const defenderSchema = new Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    imgUrl: { type: String },
    type: { type: String, required: true },
    bastionId: { type: String, required: true, index: true },
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

defenderSchema.virtual('id').get(function () {
  return this._id.toString();
});

export const DefenderModel = model('Defender', defenderSchema);