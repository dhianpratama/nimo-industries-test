import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchHistoryEntity, UserEntity } from '@nimo/entities';
import { AuthController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SqsQueues, SqsQueue } from '@nimo/common';

@Module({
	imports: [
		TypeOrmModule.forFeature([SearchHistoryEntity, UserEntity]),
		SqsModule.register({
			producers: [SqsQueues[SqsQueue.Email]],
		})
	],
	controllers: [AuthController],
	providers: [CryptoService]
})
export class CryptoModule {}
