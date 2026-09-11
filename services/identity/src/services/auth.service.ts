import bcrypt from 'bcryptjs';
import { signToken } from './token.service';
import { UserRepository } from '../repositories/user.repository';
import { RoleService } from './role.service';
import { AppService } from './app.service';
import { ForbiddenError } from '../errors/http-errors';
import { LoginUserByUsernameDto, LoginUserDto, RegisterUserDto, UpdateUserDto } from '../dtos/auth.dto';
import { IAuthUser, IUser } from '../models/user.model';
import { ROLE_USER } from '../constants/roles';

export class AuthService {
  constructor(
    private readonly userRepository = new UserRepository(),
    private readonly roleService = new RoleService(),
    private readonly appService = new AppService()
  ) {}

  async register(input: RegisterUserDto): Promise<{ user: IUser; token: string }> {
    this.validateInput(input);

    const existingEmail = await this.userRepository.findByEmail(input.email);
    const existingUsername = await this.userRepository.findByUsername(input.username);

    if (existingEmail) {
      throw new Error('Email already registered');
    }

    if (existingUsername) {
      throw new Error('Username already taken');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.userRepository.create({
      email: input.email,
      username: input.username,
      password: passwordHash,
      roles: [ROLE_USER],
      isActive: true
    });

    const token = signToken(user._id!);
    return { user: this.toPublicUser(user), token };
  }

  async login(input: LoginUserDto): Promise<{ user: IUser; token: string }> {
    if (!input.email || !input.password) {
      throw new Error('Email and password are required');
    }
    if (!input.app) {
      throw new Error('App is required');
    }
    const user = await this.userRepository.findByEmail(input.email);
    if (!user || !user.password) {
      throw new Error('Invalid credentials');
    }
    return this.authenticateAndSign(user, input.password, input.app);
  }

  async loginByUsername(input: LoginUserByUsernameDto): Promise<{ user: IUser; token: string }> {
    if (!input.username || !input.password) {
      throw new Error('Username and password are required');
    }
    if (!input.app) {
      throw new Error('App is required');
    }
    const users = await this.userRepository.findManyByUsername(input.username);
    if (!users.length) {
      throw new Error('Invalid credentials');
    }
    for (const user of users) {
      if (!user.password) continue;
      const isValidPassword = await bcrypt.compare(input.password, user.password);
      if (isValidPassword) {
        return this.authenticateAndSign(user, input.password, input.app);
      }
    }
    throw new Error('Invalid credentials');
  }

  async getRawUser(userId: string): Promise<IAuthUser | null> {
    return this.userRepository.findById(userId);
  }

  async getCurrentUser(userId: string): Promise<IUser | null> {
    const user = await this.userRepository.findById(userId);
    return user ? this.toPublicUser(user) : null;
  }

  async getUserById(userId: string): Promise<IUser | null> {
    const user = await this.userRepository.findById(userId);
    return user ? this.toPublicUser(user) : null;
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    const user = await this.userRepository.findByUsername(username);
    return user ? this.toPublicUser(user) : null;
  }

  async addRole(userId: string, roleName: string): Promise<IUser | null> {
    const user = await this.roleService.assignRole(userId, roleName);
    return this.toPublicUser(user);
  }

  async removeRole(userId: string, roleName: string): Promise<IUser | null> {
    const user = await this.roleService.removeRole(userId, roleName);
    return this.toPublicUser(user);
  }

  async updateUser(userId: string, input: UpdateUserDto): Promise<IUser | null> {
    const updateData: Record<string, unknown> = {};
    if (input.displayName !== undefined) {
      updateData.username = input.displayName;
    }

    const user = await this.userRepository.update(userId, updateData as Partial<IAuthUser>);
    return user ? this.toPublicUser(user) : null;
  }

  private async authenticateAndSign(
    user: IAuthUser,
    password: string,
    app: string
  ): Promise<{ user: IUser; token: string }> {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }
    const allowed = await this.appService.canUserAccess(app, user.roles ?? []);
    if (!allowed) {
      throw new ForbiddenError('Forbidden');
    }
    const token = signToken(user._id!);
    return { user: this.toPublicUser(user), token };
  }

  private toPublicUser(user: IAuthUser): IUser {
    return {
      id: user._id!.toString(),
      displayName: user.username,
      roles: user.roles ?? [ROLE_USER],
    };
  }

  private validateInput(input: RegisterUserDto): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      throw new Error('Valid email is required');
    }

    if (input.username.length < 3) {
      throw new Error('Username must be at least 3 characters');
    }

    if (input.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
  }
}