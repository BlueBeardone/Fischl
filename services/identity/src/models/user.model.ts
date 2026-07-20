import { Schema, model } from 'mongoose';

// Internal auth user — stored in MongoDB
export interface IAuthUser {
  _id?: string;
  email: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  bastionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Public user shape — matches Dart User model
export interface IUser {
  id: string;
  displayName: string;
  bastionId?: string;
}

const authUserSchema = new Schema<IAuthUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive: { type: Boolean, default: true },
    bastionId: { type: String },
  },
  { timestamps: true }
);

export const UserModel = model<IAuthUser>('User', authUserSchema);