import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/entities/user.entity';

export const TypeORMMySqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [...entities],
    migrations: ['../migrations/*.*'],
    migrationsTableName: 'migrations',
  });
