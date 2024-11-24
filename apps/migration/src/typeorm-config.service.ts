import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { migrations } from './migrations';
import * as entities from '@nimo/entities';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: this.configService.get('DB_HOST'),
			port: Number(+this.configService.get('DB_PORT')),
			username: this.configService.get('DB_USERNAME'),
			password: this.configService.get('DB_PASSWORD'),
			database: this.configService.get('DB_DATABASE'),
			dropSchema: false,
			keepConnectionAlive: true,
			logging: this.configService.get('NODE_ENV') !== 'production',
			entities,
			autoLoadEntities: true,
			migrations,
			cli: {
				entitiesDir: './entities',
				migrationsDir: './migrations'
			},
			options: {
				trustServerCertificate: true
			},
			...(
				this.configService.get('DB_USE_SSL') === 'true'
					? {
						ssl: true,
						extra: {
							ssl: {
								rejectUnauthorized: false,
							},
						}
					}
					: {}
			)
		} as TypeOrmModuleOptions;
	}
}
