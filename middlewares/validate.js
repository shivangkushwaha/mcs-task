const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body || req.params);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  };
};

module.exports = validate;
