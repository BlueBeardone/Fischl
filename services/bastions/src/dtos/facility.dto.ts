import type { IFacilityTable } from '../../../../shared/types';

export interface CreateFacilityDto {
  name: string;
  rank: string;
  description: string;
  imgUrl?: string;
  minimumRequiredHirelings?: number;
  constructionTurns?: number;
  cost?: number;
  table?: IFacilityTable;
  bastionId: string;
  constructedTurns?: number;
}

export interface UpdateFacilityDto {
  name?: string;
  rank?: string;
  description?: string;
  imgUrl?: string;
  minimumRequiredHirelings?: number;
  constructionTurns?: number;
  cost?: number;
  table?: IFacilityTable;
  constructedTurns?: number;
}