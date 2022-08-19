import Joi, { ValidationError } from 'joi';
import { NextApiResponse } from 'next';

export const validate = async (
  schema: Joi.Schema,
  data: any,
  res: NextApiResponse
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
    console.log('[JOI ERROR]', formattedErrors);
    res.status(400).json(formattedErrors);

    throw new Error('Bad request');
  }
};
