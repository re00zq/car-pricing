import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import filterObject from 'src/utils/filterObject';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ');

    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('you must login first');

    try {
      const payload = await this.jwtService.verify(token, {
        secret: JwtConstants.secret,
      });

      request.user = filterObject(payload, 'id', 'email');
    } catch {
      throw new UnauthorizedException('the token is not valide');
    }

    return true;
  }
}
