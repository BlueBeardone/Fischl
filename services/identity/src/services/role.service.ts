import { IRole } from '../models/role.model';
import { IAuthUser } from '../models/user.model';
import { RoleRepository } from '../repositories/role.repository';
import { UserRepository } from '../repositories/user.repository';
import { ConflictError, NotFoundError } from '../errors/http-errors';

interface CreateRoleInput {
  name: string;
  description?: string;
}

interface UpdateRoleInput {
  name?: string;
  description?: string;
}

export class RoleService {
  constructor(
    private readonly roleRepository = new RoleRepository(),
    private readonly userRepository = new UserRepository()
  ) {}

  async create(input: CreateRoleInput): Promise<IRole> {
    const name = input.name.trim().toLowerCase();
    const existing = await this.roleRepository.findByName(name);
    if (existing) {
      throw new ConflictError(`Role '${name}' already exists`);
    }
    return this.roleRepository.create({ name, description: input.description });
  }

  async list(): Promise<IRole[]> {
    return this.roleRepository.findAll();
  }

  async get(name: string): Promise<IRole> {
    const role = await this.roleRepository.findByName(name.trim().toLowerCase());
    if (!role) {
      throw new NotFoundError(`Role '${name}' not found`);
    }
    return role;
  }

  async update(name: string, input: UpdateRoleInput): Promise<IRole> {
    const existing = await this.roleRepository.findByName(name.trim().toLowerCase());
    if (!existing) {
      throw new NotFoundError(`Role '${name}' not found`);
    }
    if (input.name !== undefined) {
      const target = input.name.trim().toLowerCase();
      if (target !== existing.name) {
        const duplicate = await this.roleRepository.findByName(target);
        if (duplicate) {
          throw new ConflictError(`Role '${target}' already exists`);
        }
      }
    }
    const role = await this.roleRepository.update(name.trim().toLowerCase(), {
      ...(input.name ? { name: input.name.trim().toLowerCase() } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
    });
    if (!role) {
      throw new NotFoundError(`Role '${name}' not found`);
    }
    return role;
  }

  async remove(name: string): Promise<void> {
    const role = await this.roleRepository.deleteByName(name.trim().toLowerCase());
    if (!role) {
      throw new NotFoundError(`Role '${name}' not found`);
    }
  }

  async assignRole(userId: string, roleName: string): Promise<IAuthUser> {
    const normalized = roleName.trim().toLowerCase();
    const role = await this.roleRepository.findByName(normalized);
    if (!role) {
      throw new NotFoundError(`Role '${roleName}' not found`);
    }
    const user = await this.userRepository.addRole(userId, normalized);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async removeRole(userId: string, roleName: string): Promise<IAuthUser> {
    const normalized = roleName.trim().toLowerCase();
    const user = await this.userRepository.removeRole(userId, normalized);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }
}
