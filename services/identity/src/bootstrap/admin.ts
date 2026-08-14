import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model';
import { ROLE_USER, ROLE_ADMIN } from '../constants/roles';

export const bootstrapAdmin = async (): Promise<void> => {
  const email = process.env.ADMIN_EMAIL;
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !username || !password) {
    return;
  }

  let admin = await UserModel.findOne({ email }).exec();
  if (!admin) {
    const passwordHash = await bcrypt.hash(password, 10);
    admin = await UserModel.create({
      email,
      username,
      password: passwordHash,
      roles: [ROLE_USER, ROLE_ADMIN],
      isActive: true,
    });
  } else if (admin.password) {
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      const passwordHash = await bcrypt.hash(password, 10);
      await UserModel.updateOne({ _id: admin._id }, { password: passwordHash });
    }
  }

  if (!admin.roles || !admin.roles.includes(ROLE_ADMIN)) {
    await UserModel.updateOne({ _id: admin._id }, { $addToSet: { roles: [ROLE_USER, ROLE_ADMIN] } });
  }
};