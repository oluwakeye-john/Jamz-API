import * as Joi from 'joi';

export const configValidation = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(5001).required(),
  DATABASE_URL: Joi.string().required(),
});
