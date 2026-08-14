import { UserModel } from '../models/user.model';

export const migrateLegacyRoles = async (): Promise<void> => {
  await UserModel.updateMany(
    { role: { $exists: true }, roles: { $exists: false } },
    [{ $set: { roles: ['$role'] } }]
  ).exec();
};