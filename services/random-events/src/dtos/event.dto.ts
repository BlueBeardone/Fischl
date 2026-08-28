import type { IRollRange, IEventSubTable } from '../../../../shared/types';

export interface CreateEventDto {
  title: string;
  details?: string;
  rollRange: IRollRange;
  subTables?: IEventSubTable[];
}

export interface UpdateEventDto {
  title?: string;
  details?: string;
  rollRange?: IRollRange;
  subTables?: IEventSubTable[];
}