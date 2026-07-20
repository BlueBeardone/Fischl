export interface CreateDefenderDto {
  name?: string;
  description?: string;
  imgUrl?: string;
  type: string;
  bastionId: string;
  acquisitionStory?: string;
}

export interface UpdateDefenderDto {
  name?: string;
  description?: string;
  imgUrl?: string;
  type?: string;
  acquisitionStory?: string;
}