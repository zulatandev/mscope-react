import { Request } from 'express';
import { OrderDirection } from '../constants/global.constants';

export interface IRequest extends Request {
  user: {
    id: number;
    email: string;
  };
}

export interface IListParams {
  page?: number;
  limit?: number;
  order?: OrderDirection;
  sortBy?: string;
  search?: string;
}

export interface IPaginatedList extends IListParams {
  totalPages: number;
  totalCount: number;
  listData: any[];
}
