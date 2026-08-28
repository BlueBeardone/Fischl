import Joi from 'joi';

const rowSchema = Joi.object({
  min: Joi.number().integer().min(1).required(),
  max: Joi.number().integer().min(Joi.ref('min')).required(),
  label: Joi.string().required(),
  description: Joi.string().allow('', null).optional(),
});

const subTableSchema = Joi.object({
  die: Joi.string().required(),
  label: Joi.string().allow('', null).optional(),
  rows: Joi.array().items(rowSchema).min(1).required(),
});

export const createEventSchema = Joi.object({
  title: Joi.string().trim().required(),
  details: Joi.string().allow('', null).optional(),
  rollRange: Joi.object({
    min: Joi.number().integer().min(1).required(),
    max: Joi.number().integer().min(Joi.ref('min')).required(),
  }).required(),
  subTables: Joi.array().items(subTableSchema).optional(),
});

export const updateEventSchema = Joi.object({
  title: Joi.string().trim().optional(),
  details: Joi.string().allow('', null).optional(),
  rollRange: Joi.object({
    min: Joi.number().integer().min(1).required(),
    max: Joi.number().integer().min(Joi.ref('min')).required(),
  }).optional(),
  subTables: Joi.array().items(subTableSchema).optional(),
}).min(1);

export const eventIdSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
});