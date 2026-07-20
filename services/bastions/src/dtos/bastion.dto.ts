export interface CreateBastionDto {
  name: string;
  description: string;
  imgUrl?: string;
}

export interface UpdateBastionDto {
  name?: string;
  description?: string;
  imgUrl?: string;
}