let Joi = require("joi");

module.exports = {
  registerSchema: Joi.object({
    url: Joi.string().regex(/^((https?:\/\/)|(http?:\/\/))?(www\.)\S+\.(com|[a-z]{2,3})$/).required().messages({
      "string.empty": `URL cannot be empty`,
      "any.required": `URL is a required field`,
      "string.pattern.base": 'Please enter a valid URL'
    })
  }),
};
