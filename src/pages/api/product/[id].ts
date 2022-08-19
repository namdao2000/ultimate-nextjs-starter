import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import { ProductService } from '../../../lib/services/product.service';
import { getUser } from '../../../lib/utils/getUser';
import { validate } from '../../../lib/utils/validate';
import { handleError } from '../../../lib/utils/handleError';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      method,
      body,
      query: { id },
    } = req;

    const user = await getUser(req, res);

    switch (method) {
      case 'PATCH': {
        const schema = Joi.object({
          name: Joi.string(),
          price: Joi.string(),
          description: Joi.boolean(),
        });

        await validate(schema, body);

        const result = await ProductService.updateOneProduct(
          { id: id as string, userId: user.id },
          body
        );
        res.json(result);
        break;
      }
      case 'DELETE': {
        await ProductService.deleteOneProduct({
          id: id as string,
          userId: user.id,
        });
        res.status(200);
        break;
      }
    }
  } catch (error) {
    handleError(error, res);
  }
}
