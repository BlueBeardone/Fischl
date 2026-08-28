export type Rank = 's' | 'a' | 'b' | 'c' | 'd';

export type DefenderType = 'knight' | 'bastion_defender' | 'beast';

export interface IFacilityTable {
  table: string[][];
}

export interface IRollRange {
  min: number;
  max: number;
}

export interface ITableRow {
  min: number;
  max: number;
  label: string;
  description?: string;
}

export interface IEventSubTable {
  die: string;
  label?: string;
  rows: ITableRow[];
}

export type RewardTableType = 'reward' | 'tracky_hours';

export interface IBastionIndividualEvent {
  title: string;
  details: string;
  rollRange: IRollRange;
  subTables?: IEventSubTable[];
}

export interface IRewardTable {
  type: RewardTableType;
  die: string;
  rows: ITableRow[];
}