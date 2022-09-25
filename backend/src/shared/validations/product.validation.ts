import * as Joi from 'joi';

import { baseList, id } from './base.validation';

const card = {
  name: Joi.string().required(),
  price: Joi.number().required(),
  total: Joi.number().required(),
};

const create = {
  body: Joi.object().keys(card)
};

const list = {
  query: Joi.object().keys({
    ...baseList,
    sortBy: Joi.string().valid('updatedAt')
  })
};

const update = {
  body: Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
    total: Joi.number()
  })
};

export { create, list, id, update };
