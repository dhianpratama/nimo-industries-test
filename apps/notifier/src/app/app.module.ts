import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SqsQueue, SqsQueues } from '@nimo/common';

@Module({
  imports: [
    SqsModule.register({
			consumers: [SqsQueues[SqsQueue.Email]],
		})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
