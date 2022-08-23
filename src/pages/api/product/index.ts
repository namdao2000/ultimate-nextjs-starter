import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import { getUser } from '../../../lib/utils/getUser';
import { validate } from '../../../lib/utils/validate';
import { handleError } from '../../../lib/utils/handleError';
import { Services } from '../../../lib/buildServices';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, body } = req;

    const user = await getUser(req, res);

    switch (method) {
      case 'POST': {
        const schema = Joi.object({
          name: Joi.string().required(),
          price: Joi.string().required(),
          description: Joi.string().required(),
        });

        await validate(schema, body);
        const result = await Services.product.createOneProduct({
          ...body,
          userId: user.id,
          price: parseInt(body.price),
        });
        res.json(result);
        break;
      }
    }
  } catch (error) {
    handleError(error, res);
  }
}
