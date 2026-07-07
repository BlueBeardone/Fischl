import { Schema, model } from 'mongoose';

export interface IUser {
  _id?: string;
  email: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const UserModel = model<IUser>('User', userSchema);
