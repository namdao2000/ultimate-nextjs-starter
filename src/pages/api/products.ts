import { NextApiRequest, NextApiResponse } from 'next';
import { ProductService } from '../../lib/services/product.service';
import { getUser } from '../../lib/utils/getUser';
import { handleError } from '../../lib/utils/handleError';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;

    await getUser(req, res);

    switch (method) {
      case 'GET': {
        const result = await ProductService.getManyProducts();
        res.json(result);
        break;
      }
    }
  } catch (error) {
    handleError(error, res);
  }
}
