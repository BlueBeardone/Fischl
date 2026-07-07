import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from '../dtos/auth.dto';
import { IUser } from '../models/user.model';

export class AuthService {
  constructor(private readonly userRepository = new UserRepository()) {}

  async register(input: RegisterUserDto): Promise<{ user: Partial<IUser>; token: string }> {
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
      role: 'user',
      isActive: true
    });

    const token = this.signToken(user._id!);
    return { user: this.sanitizeUser(user), token };
  }

  async login(input: LoginUserDto): Promise<{ user: Partial<IUser>; token: string }> {
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
    return { user: this.sanitizeUser(user), token };
  }

  async getCurrentUser(userId: string): Promise<Partial<IUser> | null> {
    const user = await this.userRepository.findById(userId);
    return user ? this.sanitizeUser(user) : null;
  }

  async getUserById(userId: string): Promise<Partial<IUser> | null> {
    const user = await this.userRepository.findById(userId);
    return user ? this.sanitizeUser(user) : null;
  }

  async updateUser(userId: string, input: UpdateUserDto): Promise<Partial<IUser> | null> {
    const user = await this.userRepository.update(userId, input);
    return user ? this.sanitizeUser(user) : null;
  }

  private signToken(userId: string): string {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    return jwt.sign({ sub: userId }, secret, { expiresIn: '7d' });
  }

  private sanitizeUser(user: IUser): Partial<IUser> {
    const { password, ...rest } = user;
    return rest;
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
