import { Schema, model } from 'mongoose';
import { ROLE_USER } from '../constants/roles';

// Internal auth user — stored in MongoDB
export interface IAuthUser {
  _id?: string;
  email: string;
  username: string;
  password: string;
  roles: string[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Public user shape — matches Dart User model
export interface IUser {
  id: string;
  displayName: string;
  roles: string[];
}

const authUserSchema = new Schema<IAuthUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    roles: { type: [String], default: [ROLE_USER] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const UserModel = model<IAuthUser>('User', authUserSchema);