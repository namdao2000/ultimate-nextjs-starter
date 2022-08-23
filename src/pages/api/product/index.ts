import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import { ProductService } from '../../../lib/services/product/productService';
import { getUser } from '../../../lib/utils/getUser';
import { validate } from '../../../lib/utils/validate';
import { handleError } from '../../../lib/utils/handleError';

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
          description: Joi.boolean().required(),
        });

        await validate(schema, body);
        const result = await ProductService.createOneProduct({
          userId: user.id,
          ...body,
        });
        res.json(result);
        break;
      }
    }
  } catch (error) {
    handleError(error, res);
  }
}
