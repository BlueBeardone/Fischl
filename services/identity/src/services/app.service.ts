import { IApp } from '../models/app.model';
import { AppRepository } from '../repositories/app.repository';
import { RoleRepository } from '../repositories/role.repository';
import { ConflictError, NotFoundError } from '../errors/http-errors';

interface CreateAppInput {
  slug: string;
  name: string;
  allowedRoles?: string[];
}

interface UpdateAppInput {
  slug?: string;
  name?: string;
  allowedRoles?: string[];
}

export class AppService {
  constructor(
    private readonly appRepository = new AppRepository(),
    private readonly roleRepository = new RoleRepository()
  ) {}

  private async validateRoles(roles: string[]): Promise<void> {
    for (const role of roles) {
      const normalized = role.trim().toLowerCase();
      const exists = await this.roleRepository.findByName(normalized);
      if (!exists) {
        throw new NotFoundError(`Role '${role}' not found`);
      }
    }
  }

  async create(input: CreateAppInput): Promise<IApp> {
    const slug = input.slug.trim().toLowerCase();
    const existing = await this.appRepository.findBySlug(slug);
    if (existing) {
      throw new ConflictError(`App '${slug}' already exists`);
    }
    const allowedRoles = (input.allowedRoles ?? []).map((r) => r.trim().toLowerCase());
    await this.validateRoles(allowedRoles);
    return this.appRepository.create({ slug, name: input.name, allowedRoles });
  }

  async list(): Promise<IApp[]> {
    return this.appRepository.findAll();
  }

  async get(slug: string): Promise<IApp> {
    const app = await this.appRepository.findBySlug(slug.trim().toLowerCase());
    if (!app) {
      throw new NotFoundError(`App '${slug}' not found`);
    }
    return app;
  }

  async update(slug: string, input: UpdateAppInput): Promise<IApp> {
    const existing = await this.appRepository.findBySlug(slug.trim().toLowerCase());
    if (!existing) {
      throw new NotFoundError(`App '${slug}' not found`);
    }
    if (input.slug !== undefined) {
      const target = input.slug.trim().toLowerCase();
      if (target !== existing.slug) {
        const duplicate = await this.appRepository.findBySlug(target);
        if (duplicate) {
          throw new ConflictError(`App '${target}' already exists`);
        }
      }
    }
    if (input.allowedRoles !== undefined) {
      await this.validateRoles(input.allowedRoles.map((r) => r.trim().toLowerCase()));
    }
    const app = await this.appRepository.update(slug.trim().toLowerCase(), {
      ...(input.slug ? { slug: input.slug.trim().toLowerCase() } : {}),
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.allowedRoles !== undefined
        ? { allowedRoles: input.allowedRoles.map((r) => r.trim().toLowerCase()) }
        : {}),
    });
    if (!app) {
      throw new NotFoundError(`App '${slug}' not found`);
    }
    return app;
  }

  async remove(slug: string): Promise<void> {
    const app = await this.appRepository.deleteBySlug(slug.trim().toLowerCase());
    if (!app) {
      throw new NotFoundError(`App '${slug}' not found`);
    }
  }

  async canUserAccess(slug: string, userRoles: string[]): Promise<boolean> {
    const app = await this.appRepository.findBySlug(slug.trim().toLowerCase());
    if (!app) {
      return false;
    }
    const allowed = new Set(app.allowedRoles);
    return (userRoles ?? []).some((role) => allowed.has(role));
  }
}