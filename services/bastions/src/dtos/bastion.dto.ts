import type { IFacilityTable } from '../../../../shared/types';

export interface CreateBastionDto {
  name: string;
  description: string;
  imgUrl?: string;
  facilities?: UpdateBastionFacilityDto[];
}

export interface UpdateBastionFacilityDto {
  id?: string;
  name: string;
  rank: string;
  description: string;
  imgUrl?: string;
  minimumRequiredHirelings?: number;
  constructionTurns?: number;
  cost?: number;
  table?: IFacilityTable;
  constructedTurns?: number;
}

export interface UpdateBastionDto {
  name?: string;
  description?: string;
  imgUrl?: string;
  discordThreadId?: string;
  facilities?: UpdateBastionFacilityDto[];
}