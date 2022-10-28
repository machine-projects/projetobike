import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ControllerVersionHelper } from '../helpers/controllerversion.helper';
import { AuthService } from './auth.service';
import { Public } from './public.guard';

@Controller(ControllerVersionHelper.v1 + 'auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @Public()
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
