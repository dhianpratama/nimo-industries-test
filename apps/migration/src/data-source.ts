import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { migrations } from './migrations';
import * as entities from '@nimo/entities';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	dropSchema: false,
	keepConnectionAlive: true,
	logging: process.env.NODE_ENV !== 'production',
	entities,
	autoLoadEntities: true,
	migrations,
	cli: {
		entitiesDir: './entities',
		migrationsDir: './migrations',
		seedsDir: './seeds'
	},
	extra: {
		max: process.env.DATABASE_MAX_CONNECTIONS ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) : 100
	},
	...(
		process.env.DB_USE_SSL === 'true'
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
} as DataSourceOptions);
