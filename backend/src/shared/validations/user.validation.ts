import * as Joi from 'joi';

import { baseList, id } from './base.validation';

const user = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  phoneNumber: Joi.string(),
  role: Joi.string()
};

const create = {
  body: Joi.object().keys(user)
};

const list = {
  query: Joi.object().keys({
    ...baseList,
    sortBy: Joi.string().valid('email', 'createdAt')
  })
};

const update = {
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
    role: Joi.string()
  })
};

export { create, list, id, update };
