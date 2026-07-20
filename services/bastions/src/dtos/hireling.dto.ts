export interface CreateHirelingDto {
  name: string;
  role?: string;
  description?: string;
  imgUrl?: string;
  bastionId: string;
  facilityId?: string;
  acquisitionStory?: string;
}

export interface UpdateHirelingDto {
  name?: string;
  role?: string;
  description?: string;
  imgUrl?: string;
  facilityId?: string;
  acquisitionStory?: string;
}
