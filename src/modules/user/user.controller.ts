import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import JwtGuard from '../auth/jwt.guard';
import { RequestWithUser } from '../../variables';
import { Response } from 'express';
import { User } from '../../entities/user.entity';
import {
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UpdateUserDto } from '../../dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiCookieAuth()
  @UseGuards(JwtGuard)
  @Put()
  @ApiResponse({ status: 200, type: User, description: 'updated user' })
  @ApiResponse({
    status: 404,
    description: 'not found',
  })
  updateUser(
    @Req() { user, body }: RequestWithUser<UpdateUserDto>,
  ): Promise<NotFoundException | User> {
    return this.userService.updateUser(user.id, body);
  }

  @ApiCookieAuth()
  @UseGuards(JwtGuard)
  @Get()
  @ApiResponse({ status: 200, type: User, description: 'current user data' })
  getUserData(
    @Req() { user }: RequestWithUser<null>,
    @Res() res: Response,
  ): Response<User> {
    return res.json(user);
  }
}
