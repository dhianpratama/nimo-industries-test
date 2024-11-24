import { Message } from '@aws-sdk/client-sqs';
import { Injectable, Logger } from '@nestjs/common';
import { SearchStatusEnum, SqsQueue } from '@nimo/common';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchHistoryEntity } from '@nimo/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  private sesClient;

  constructor(@InjectRepository(SearchHistoryEntity) private searchHistoryRepository: Repository<SearchHistoryEntity>,) {
    this.sesClient = new SESClient({
      credentials: {
        accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
        secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
      },
      region: 'ap-southeast-2',
    });
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  private createSendEmailCommand = (toAddress, subject, body) => {
    return new SendEmailCommand({
      Destination: {
        ToAddresses: [
          toAddress,
        ],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: body,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: 'muthidp@gmail.com',
    });
  };

  @SqsMessageHandler(SqsQueue.Email, false)
  public async handleMessage(message: Message) {
    const data = JSON.parse(message.Body);

    const sendEmailCommand = this.createSendEmailCommand(
      data.email,
      `Your Requested Crypto Price`,
      `
      Dear ${data.email},

      Thank you for using our service to check the latest cryptocurrency prices.

      Here are the details you requested:

      Cryptocurrency: ${data.ticker.toUpperCase()}
      Price (in ${data.vsCurrency.toUpperCase()}): ${data.price}
      As of: ${data.timestamp}
      We strive to provide accurate and up-to-date information. Please note that cryptocurrency prices are highly volatile and may change rapidly.

      If you have any further queries or wish to check other crypto prices, feel free to reach out or use our app again!

      Thank you for trusting us to keep you informed.

      Best regards,
      John Doe
      `
    );

    try {
      await this.sesClient.send(sendEmailCommand);
      await this.searchHistoryRepository.update({ id: data.historyId }, { status: SearchStatusEnum.EMAIL_SENT })
    } catch (e) {
      console.error('Failed to send email.', e);
      await this.searchHistoryRepository.update({ id: data.historyId }, { status: SearchStatusEnum.SENDING_EMAIL_FAILED })
      return e;
    }
  }
}
