import { Schema, model } from 'mongoose';

export interface IApp {
  _id?: string;
  slug: string;
  name: string;
  allowedRoles: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const appSchema = new Schema<IApp>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    allowedRoles: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const AppModel = model<IApp>('App', appSchema);