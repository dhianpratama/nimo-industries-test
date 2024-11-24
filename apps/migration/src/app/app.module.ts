import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from '../typeorm-config.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: Joi.object({
				DB_PASSWORD: Joi.string().required(),
				DB_USERNAME: Joi.string().required(),
				DB_HOST: Joi.string().required(),
				DB_PORT: Joi.string().required(),
				DB_DATABASE: Joi.string().required()
			}),
			validationOptions: {
				allowUnknown: true,
				abortEarly: false
			}
		}),
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfigService,
			dataSourceFactory: async (options: DataSourceOptions) => {
				return await new DataSource(options).initialize();
			}
		}),
	],
	controllers: [],
	providers: []
})
export class AppModule {}
