const Joi = require('joi');

const { regexp } = require('../constants');

module.exports = Joi.object({
  email: Joi.string()
    .regex(regexp.EMAIl)
    .required(),

  password: Joi.string()
    .required()
});
