import path from 'path';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  logging: true,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: +process.env.DATABASE_PORT,
  migrationsRun: true,
  synchronize: true,
  entities: [path.join(__dirname, '..', 'entities', '*.entity.{js,ts}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.*')],
});
