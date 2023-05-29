import { boolean } from 'boolean';
import { NamingStrategy } from 'common';
import { AppEnvironment } from 'shared';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
require('dotenv').config();

let config: DataSourceOptions & PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
  logger: 'simple-console',
  extra: {
    options: '-c lock_timeout=60000ms',
  },
  logging: boolean(process.env.SHOW_SQL),
  migrationsTransactionMode: 'all',
  namingStrategy: new NamingStrategy(),
};

switch (process.env.NODE_ENV) {
  case AppEnvironment.TEST:
    break;

  case AppEnvironment.DEVELOPMENT:
    config = {
      ...config,
      synchronize: false,
      migrationsRun: true,
      logging: false,
    };
    break;

  case AppEnvironment.PRODUCTION:
    config = {
      ...config,
      synchronize: false,
      migrationsRun: true,
      logging: false,
    };
    break;

  // default is local
  default:
    config = {
      ...config,
      synchronize: false,
      migrationsRun: false,
      logging: boolean(process.env.SHOW_SQL),
    };
    break;
}

export const dataSource = new DataSource(config);
