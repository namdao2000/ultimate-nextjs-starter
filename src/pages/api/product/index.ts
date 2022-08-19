import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import { ProductService } from '../../../lib/services/product.service';
import { getUser } from '../../../lib/utils/getUser';
import { validate } from '../../../lib/utils/validate';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  const user = await getUser(req, res);

  switch (method) {
    case 'POST': {
      const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.string().required(),
        description: Joi.boolean().required(),
      });

      await validate(schema, body, res);
      const result = await ProductService.createOneProduct({
        userId: user.id,
        ...body,
      });
      res.json(result);
      break;
    }
  }
}
