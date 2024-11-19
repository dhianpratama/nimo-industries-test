import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as entities from '@nimo/entities';

export const TypeOrmConfigOptions: TypeOrmModuleOptions = {
	type: 'postgres',
	host: process.env['DB_HOST'],
	port: Number(process.env['DB_PORT'] || 5432),
	username: process.env['DB_USERNAME'],
	password: process.env['DB_PASSWORD'],
	database: process.env['DB_DATABASE'],
	dropSchema: false,
	keepConnectionAlive: true,
	logging: process.env['NODE_ENV'] !== 'production',
	entities,
	...(
		process.env['DB_USE_SSL'] === 'true'
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
  }