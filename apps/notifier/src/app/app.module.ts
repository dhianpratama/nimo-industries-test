import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SqsQueue, SqsQueues, TypeOrmConfigOptions } from '@nimo/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchHistoryEntity } from '@nimo/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfigOptions),
    TypeOrmModule.forFeature([SearchHistoryEntity]),
    SqsModule.register({
			consumers: [SqsQueues[SqsQueue.Email]],
		})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
