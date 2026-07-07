import { Schema, model } from 'mongoose';

export interface IBastion {
  _id?: string;
  name: string;
  description?: string;
  ownerId: string;
  rank?: string;
  location?: string;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

const bastionSchema = new Schema<IBastion>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    ownerId: { type: String, required: true },
    rank: { type: String, default: 'novice' },
    location: { type: String, trim: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

export const BastionModel = model<IBastion>('Bastion', bastionSchema);
