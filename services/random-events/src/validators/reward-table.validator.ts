import Joi from 'joi';

const rowSchema = Joi.object({
  min: Joi.number().integer().min(1).required(),
  max: Joi.number().integer().min(Joi.ref('min')).required(),
  label: Joi.string().required(),
  description: Joi.string().allow('', null).optional(),
});

export const createRewardTableSchema = Joi.object({
  type: Joi.string().valid('reward', 'tracky_hours').required(),
  die: Joi.string().trim().required(),
  rows: Joi.array().items(rowSchema).min(1).required(),
});

export const updateRewardTableSchema = Joi.object({
  type: Joi.string().valid('reward', 'tracky_hours').optional(),
  die: Joi.string().trim().optional(),
  rows: Joi.array().items(rowSchema).min(1).optional(),
}).min(1);

export const rewardTableIdSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
});