import { NextApiResponse } from 'next';
import { logger } from './logger';
import { HttpError } from './httpError';

// Global error handler for NextJS.
// This function will log error and send back an appropriate response to the client.
export const handleError = (error: any, res: NextApiResponse) => {
  // If our error is part of the HttpError, we can handle it accordingly.
  if (error instanceof HttpError) {
    res.status(error.status).send(error.message);
    logger.warn({ errorType: 'Http Error', data: error.data }, error.message);
    return;
  }
  // Else, we log the error and send a 500 error.
  res.status(500).send('Internal Server error');

  if (error instanceof Error) {
    logger.error(
      { errorType: 'Internal Server Error', errorTrace: error.stack },
      error.message
    );
  } else {
    logger.error({ errorType: 'Unknown Internal Server Error', error });
  }
};
