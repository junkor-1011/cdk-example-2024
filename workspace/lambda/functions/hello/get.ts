import 'source-map-support';

import { Logger } from '@aws-lambda-powertools/logger';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const logger = new Logger({ serviceName: 'hello-world-get' });

export const lambdaHandler = async (
  _event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  logger.info('lambda init');

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world',
    }),
  } as const satisfies APIGatewayProxyResult;

  return response;
};
