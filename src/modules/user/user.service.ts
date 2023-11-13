import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto, UserDto } from '../../dto/user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  public async updateUser(id: number, data: Partial<User>) {
    const user = await this.userRepo.preload({ id, ...data });
    if (!user) {
      return new NotFoundException(`no user with id ${id}`);
    }
    await this.userRepo.save({ id, ...data });
    user.password_hash = undefined;
    console.log(user);
    return user;
  }
}
