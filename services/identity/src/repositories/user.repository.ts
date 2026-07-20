import { UserModel, IAuthUser } from '../models/user.model';

export class UserRepository {
  async create(data: Partial<IAuthUser>): Promise<IAuthUser> {
    const user = await UserModel.create(data);
    return user.toObject() as IAuthUser;
  }

  async findByEmail(email: string): Promise<IAuthUser | null> {
    return UserModel.findOne({ email }).lean().exec();
  }

  async findById(id: string): Promise<IAuthUser | null> {
    return UserModel.findById(id).lean().exec();
  }

  async findByUsername(username: string): Promise<IAuthUser | null> {
    return UserModel.findOne({ username }).lean().exec();
  }

  async update(id: string, data: Partial<IAuthUser>): Promise<IAuthUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true }).lean().exec();
  }
}
