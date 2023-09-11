import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './constants';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      global: true,
      signOptions: { expiresIn: '30s' },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
