import { Message } from '@aws-sdk/client-sqs';
import { Injectable, Logger } from '@nestjs/common';
import { SqsQueue } from '@nimo/common';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  @SqsMessageHandler(SqsQueue.Email, false)
  public async handleMessage(message: Message) {
    Logger.log('received', message)
  }

  @SqsConsumerEventHandler(SqsQueue.Email, 'processing_error')
  public onProcessingError(error: Error, message: Message) {
    Logger.log(error)
    Logger.log(message)
  }
}
