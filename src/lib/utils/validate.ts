import Joi, { ValidationError } from 'joi';
import { NextApiResponse } from 'next';
import { logger } from './logger';
import { HttpError } from './httpError';

export const validate = async (
  schema: Joi.Schema,
  data: any
): Promise<void> => {
  try {
    await schema.validateAsync(data);
  } catch (e) {
    const error = e as ValidationError;
    const formattedErrors = error.details.map(({ message, context }) => {
      return {
        message,
        context,
      };
    });
    throw new HttpError(404, 'Bad request', formattedErrors);
  }
};
