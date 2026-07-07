export interface CreateBastionDto {
  name: string;
  description?: string;
  ownerId: string;
  rank?: string;
  location?: string;
  status?: 'active' | 'inactive';
}

export interface UpdateBastionDto {
  name?: string;
  description?: string;
  ownerId?: string;
  rank?: string;
  location?: string;
  status?: 'active' | 'inactive';
}
