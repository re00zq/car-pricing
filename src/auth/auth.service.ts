import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userSrvice: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userSrvice.findOne({ email });

    if (!user || user.password !== password)
      return new UnauthorizedException("the email or password is't correct");

    const payload = { id: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
