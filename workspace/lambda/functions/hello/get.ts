import 'source-map-support';

import { Logger } from '@aws-lambda-powertools/logger';
import { MetricUnits, Metrics } from '@aws-lambda-powertools/metrics';
import { Tracer } from '@aws-lambda-powertools/tracer';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const serviceName = 'hello-world-get'; // TMP

const logger = new Logger({ serviceName });
const tracer = new Tracer({ serviceName });
const metrics = new Metrics({
  namespace: 'hello-world',
  serviceName,
});

export const lambdaHandler = async (
  _event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  tracer.getSegment();

  metrics.addMetric('lambdaInvoke', MetricUnits.Count, 1);
  logger.info('lambda init');

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world',
    }),
  } as const satisfies APIGatewayProxyResult;

  return response;
};
