export interface RegisterUserDto {
  email: string;
  username: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  role?: 'user' | 'admin';
  isActive?: boolean;
}
