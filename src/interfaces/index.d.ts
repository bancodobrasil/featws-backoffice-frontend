import { TRuleStatus } from '../types';

export interface IRuleSheetMetadata {
  slug?: string;
  description?: string;
  code?: string;
  responsible?: string;
  rules?: IRule[];
  updatedAt?: Date;
}

export interface IRuleSheet extends IRuleSheetMetadata {
  id: number;
  name: string;
}

export interface IRule {
  id: string;
  name: string;
  date: Date;
  author: string;
  status: TRuleStatus;
}
