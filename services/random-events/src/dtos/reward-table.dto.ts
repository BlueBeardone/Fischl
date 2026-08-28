import type { ITableRow, RewardTableType } from '../../../../shared/types';

export interface CreateRewardTableDto {
  type: RewardTableType;
  die: string;
  rows: ITableRow[];
}

export interface UpdateRewardTableDto {
  type?: RewardTableType;
  die?: string;
  rows?: ITableRow[];
}