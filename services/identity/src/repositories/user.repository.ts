import { UserModel, IUser } from '../models/user.model';

export class UserRepository {
  async create(data: Partial<IUser>): Promise<IUser> {
    const user = await UserModel.create(data);
    return user.toObject() as IUser;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).lean().exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).lean().exec();
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return UserModel.findOne({ username }).lean().exec();
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true }).lean().exec();
  }
}
