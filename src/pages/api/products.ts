import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '../../lib/utils/getUser';
import { handleError } from '../../lib/utils/handleError';
import { Core } from '../../lib/core';

const services = new Core().services;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;

    await getUser(req, res);

    switch (method) {
      case 'GET': {
        const result = await services.product.getManyProducts();
        res.json(result);
        break;
      }
    }
  } catch (error) {
    handleError(error, res);
  }
}
