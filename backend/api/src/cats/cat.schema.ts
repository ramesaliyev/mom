const Joi = require('joi');

export const catSchema = Joi.object().keys({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  age: Joi.number()
    .min(0)
    .max(30)
    .required(),
  breed: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
});
