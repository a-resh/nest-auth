import { Request } from 'express';
import { UserDto } from '../dto/user.dto';
import { mixin } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export const AppConfig = () => ({
  env: process.env,
  jwtSecret: process.env.JWT_SECRET,
});

export enum PostgresErrorCode {
  UniqueViolation = '23505',
}

export interface TokenPayload {
  user: UserDto;
}

export class RequestWithUser<T> {
  body: T;

  user: UserDto;
}

type Constructor<T = {}> = new (...args: any[]) => T;

export function withUserRequest<TBase extends Constructor>(
  Base: TBase,
  options?: ApiPropertyOptions | undefined,
) {
  class ResponseWithUser {
    user: UserDto;

    @Type(() => Base)
    @ValidateNested({ each: true })
    body!: InstanceType<TBase>;
  }
  return mixin(ResponseWithUser);
}
