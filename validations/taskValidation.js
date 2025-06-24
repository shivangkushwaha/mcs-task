const Joi = require('joi');

const taskCreateValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).optional(),
  status: Joi.string().valid('pending', 'in-progress', 'done').default('pending'),
  assignedTo: Joi.string().optional(), // Can be a User ID (if assigning task)
});

const taskUpdateValidation = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).optional(),
  status: Joi.string().valid('pending', 'in-progress', 'done').optional(),
  assignedTo: Joi.string().optional(), // Can be a User ID (if assigning task)
});

const taskIdParamValidation = Joi.object({
  id: Joi.string().length(24).hex().required(), // MongoDB ObjectId length and format
});

module.exports = { taskCreateValidation, taskUpdateValidation, taskIdParamValidation };
