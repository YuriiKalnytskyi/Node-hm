const Joi = require('joi');

const { regexp } = require('../constants');

module.exports = Joi.object({

  name: Joi.string()
    .min(2)
    .max(50),

  email: Joi.string()
    .regex(regexp.EMAIl)
    .required(),

  password: Joi.string()
    .required()
    // .regex(regexp.PASSWORD)
});
