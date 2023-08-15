const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string().min(5);
const completed = Joi.boolean();

const createTaskSchema = Joi.object({
  title: title.required(),
});

const updateTaskSchema = Joi.object({
  title: title,
  completed: completed,
});

const getTaskSchema = Joi.object({
  id: id.required(),
});

module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema };
