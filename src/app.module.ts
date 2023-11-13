import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './variables';
import { User } from './entities/user.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    SharedModule,
    ConfigModule.forRoot({
      load: [AppConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User],
      migrations: ['./migrations/*.*'],
      migrationsTableName: 'migrations',
    }),
  ],
})
export class AppModule {}
