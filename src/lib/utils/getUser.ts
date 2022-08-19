import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { HttpError } from './httpError';

// Authentication Middleware
export const getUser = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<{
  id: string;
  email: string;
}> => {
  const token = await getToken({
    req,
    secret: process.env.SECRET,
  });

  if (!token) {
    throw new HttpError(401, 'User not authenticated');
  }

  return {
    id: token.sub as string,
    email: token.email as string,
  };
};
