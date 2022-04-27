import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
     PassportModule,
      JwtModule.register({
        privateKey: process.env.PRIVATE_KEY,
        signOptions: {expiresIn: '60s'}
  })],
  providers: [AuthService],
  controllers: [AuthController, LocalStrategy]
})
export class AuthModule { }
