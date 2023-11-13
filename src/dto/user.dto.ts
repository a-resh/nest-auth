import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UserDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly id: number;

  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @ApiProperty()
  password_hash: string | undefined;
}

export class UpdateUserDto extends PartialType(UserDto) {}
