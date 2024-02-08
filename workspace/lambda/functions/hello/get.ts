import 'source-map-support';

import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const lambdaHandler = async (
  _event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world',
    }),
  } as const satisfies APIGatewayProxyResult;

  return response;
};
