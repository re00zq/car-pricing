import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Get,
} from '@nestjs/common';
import { SignInDto } from 'src/users/dtos/signin-dto';
import { AuthService } from './auth.service';
import { serialize } from 'src/users/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user-dto';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const response = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    res.send(response);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  viewProfile(@Req() req, @Res() res: Response) {
    res.send(req.user);
  }
}
