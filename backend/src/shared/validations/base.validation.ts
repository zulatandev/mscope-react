import * as Joi from 'joi';
import { OrderDirection } from '../constants/global.constants';

const id = {
  params: Joi.object().keys({
    id: Joi.number().required()
  })
};

const baseList = {
  search: Joi.string().allow(''),
  page: Joi.number()
    .min(0)
    .default(0),
  limit: Joi.number()
    .min(1)
    .default(10),
  order: Joi.string().valid(OrderDirection.ASC, OrderDirection.DESC),
  sortBy: Joi.string()
};

export { id, baseList };
