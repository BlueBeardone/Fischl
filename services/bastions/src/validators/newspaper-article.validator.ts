import Joi from 'joi';

export const createNewspaperArticleSchema = Joi.object({
  title: Joi.string().trim().required(),
  content: Joi.string().required(),
  imageUrl: Joi.string().uri().optional(),
  author: Joi.string().allow('', null).optional(),
  bastionId: Joi.string().required(),
});
