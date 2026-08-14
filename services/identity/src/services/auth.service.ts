import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { RoleService } from './role.service';
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from '../dtos/auth.dto';
import { IAuthUser, IUser } from '../models/user.model';
import { ROLE_USER } from '../constants/roles';

export class AuthService {
  constructor(
    private readonly userRepository = new UserRepository(),
    private readonly roleService = new RoleService()
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

    const token = this.signToken(user._id!);
    return { user: this.toPublicUser(user), token };
  }

  async login(input: LoginUserDto): Promise<{ user: IUser; token: string }> {
    if (!input.email || !input.password) {
      throw new Error('Email and password are required');
    }

    const user = await this.userRepository.findByEmail(input.email);
    if (!user || !user.password) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(input.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = this.signToken(user._id!);
    return { user: this.toPublicUser(user), token };
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
    if (input.bastionId !== undefined) {
      updateData.bastionId = input.bastionId;
    }

    const user = await this.userRepository.update(userId, updateData as Partial<IAuthUser>);
    return user ? this.toPublicUser(user) : null;
  }

  private signToken(userId: string): string {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    return jwt.sign({ sub: userId }, secret, { expiresIn: '7d' });
  }

  private toPublicUser(user: IAuthUser): IUser {
    return {
      id: user._id!.toString(),
      displayName: user.username,
      bastionId: user.bastionId,
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