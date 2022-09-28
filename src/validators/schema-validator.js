const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().required().min(5).max(25),
});

module.exports = { categorySchema };
