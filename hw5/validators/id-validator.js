const Joi = require('joi');

module.exports = Joi.object({
  id: Joi.string()
    .min(24)
    .max(24)
    .id()
});
