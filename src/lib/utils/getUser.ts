import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

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

  if (!token?.user) {
    res.status(401).send('User not authenticated');
    throw new Error('User not authenticated');
  }

  return {
    id: token.sub as string,
    email: token.email as string,
  };
};
