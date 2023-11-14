import {
  Body,
  Controller, Delete,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from '../../dto/auth.dto';
import { Response } from 'express';
import { LocalGuard } from './local.guard';
import { RequestWithUser } from '../../variables';
import JwtGuard from './jwt.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalGuard)
  @Post('sign-in')
  @ApiResponse({
    status: 200,
    type: User,
    description: 'Sign In (Get User with auth cookie)',
  })
  signIn(
    @Req() { user }: RequestWithUser<SignInDto>,
    @Body() body: SignInDto,
    @Res() res: Response,
  ): Response<User> {
    const cookie = this.authService.getCookieWithJwtToken(user);
    res.setHeader('Set-Cookie', cookie);
    user.password_hash = undefined;
    return res.send(user);
  }
  @UseGuards(JwtGuard)
  @Delete('sign-out')
  @ApiResponse({ status: 200, description: 'Delete auth cookies' })
  signOut(@Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return res.sendStatus(200);
  }
  @Post('sign-up')
  @ApiResponse({ status: 200, type: User, description: 'Creat user' })
  async signUp(
    @Body() body: SignUpDto,
    @Res() res: Response,
  ): Promise<Response<User>> {
    const user = await this.authService.signUp(body);
    const cookie = this.authService.getCookieWithJwtToken(user);
    res.setHeader('Set-Cookie', cookie);
    return res.send(user);
  }
}
