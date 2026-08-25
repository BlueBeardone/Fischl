export interface RegisterUserDto {
  email: string;
  username: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
  app: string;
}

export interface LoginUserByUsernameDto {
  username: string;
  password: string;
  app: string;
}

export interface UpdateUserDto {
  displayName?: string;
}