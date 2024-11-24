import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchHistoryEntity, UserEntity } from '@nimo/entities';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SqsQueues, SqsQueue } from '@nimo/common';

@Module({
	imports: [
		TypeOrmModule.forFeature([SearchHistoryEntity, UserEntity]),
	],
	controllers: [HistoryController],
	providers: [HistoryService]
})
export class HistoryModule {}
