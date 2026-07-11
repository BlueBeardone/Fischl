import Joi from 'joi';

export const createArticleSchema = Joi.object({
  title: Joi.string().trim().required(),
  content: Joi.string().required(),
  imageUrl: Joi.string().uri().optional(),
  author: Joi.string().allow('', null).optional()
});

export const updateArticleSchema = Joi.object({
  title: Joi.string().trim().optional(),
  content: Joi.string().optional(),
  imageUrl: Joi.string().uri().optional(),
  author: Joi.string().allow('', null).optional()
}).min(1);

export const articleIdSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
});