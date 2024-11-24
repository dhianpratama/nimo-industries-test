import { SQSClient } from "@aws-sdk/client-sqs";
import { SqsConsumerOptions, SqsProducerOptions } from "@ssut/nestjs-sqs/dist/sqs.types";

const SQS_ENDPOINT = process.env["SQS_ENDPOINT"] || 'http://localhost:9324/000000000000';


console.log('process.env', process.env)

export enum SqsQueue {
  Email = 'email-queue',
}

const sqs = new SQSClient({
  apiVersion: '2012-11-05',
  credentials: {
    accessKeyId: process.env["AWS_ACCESS_KEY_ID"] as string,
    secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"] as string 
  },
  endpoint: SQS_ENDPOINT,
  region: 'ap-southeast-2',
});

export const SqsQueues: { [key in SqsQueue]: SqsConsumerOptions | SqsProducerOptions } = {
  [SqsQueue.Email]: {
    name: SqsQueue.Email,
    queueUrl: `${SQS_ENDPOINT}/${SqsQueue.Email}`,
    sqs,
  },
};