import path from 'node:path';
import url from 'node:url';
import {
  Duration,
  Stack,
  type StackProps,
  aws_apigateway as apigateway,
  aws_lambda as lambda,
} from 'aws-cdk-lib';
import {
  // type ICommandHooks,
  NodejsFunction,
  type NodejsFunctionProps,
  OutputFormat,
} from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const esmBanner =
  'import { createRequire as topLevelCreateRequire } from "module"; import url from "url"; const require = topLevelCreateRequire(import.meta.url); const __filename = url.fileURLToPath(import.meta.url); const __dirname = url.fileURLToPath(new URL(".", import.meta.url));';

const lambdaNodejsBundlingOption = {
  sourceMap: true,
  minify: true,
  format: OutputFormat.ESM,
  tsconfig: path.join(__dirname, '../../lambda/tsconfig.json'),
  banner: esmBanner,
  externalModules: ['@aws-sdk/*'],
} as const satisfies NodejsFunctionProps['bundling'];

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkAppQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const helloFunction = new NodejsFunction(this, 'hello-world-function', {
      handler: 'lambdaHandler',
      entry: path.join(__dirname, '../../lambda/functions/hello/get.ts'),
      runtime: lambda.Runtime.NODEJS_20_X,
      bundling: lambdaNodejsBundlingOption,
      timeout: Duration.seconds(30),
      memorySize: 256,
    });

    const api = new apigateway.RestApi(this, 'webapi', {
      restApiName: 'hello-world-api',
    });

    api.root
      .addResource('hello')
      .addMethod('GET', new apigateway.LambdaIntegration(helloFunction));
  }
}
