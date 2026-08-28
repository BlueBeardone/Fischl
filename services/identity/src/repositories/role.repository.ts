import { RoleModel, IRole } from '../models/role.model';

export class RoleRepository {
  async create(data: Partial<IRole>): Promise<IRole> {
    const role = await RoleModel.create(data);
    return role.toObject() as IRole;
  }

  async findAll(): Promise<IRole[]> {
    return RoleModel.find().lean().exec();
  }

  async findByName(name: string): Promise<IRole | null> {
    return RoleModel.findOne({ name }).lean().exec();
  }

  async findById(id: string): Promise<IRole | null> {
    return RoleModel.findById(id).lean().exec();
  }

  async update(name: string, data: Partial<IRole>): Promise<IRole | null> {
    return RoleModel.findOneAndUpdate({ name }, data, { new: true }).lean().exec();
  }

  async deleteByName(name: string): Promise<IRole | null> {
    return RoleModel.findOneAndDelete({ name }).lean().exec();
  }
}
