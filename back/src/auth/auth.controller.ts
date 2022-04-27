import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ControllerVersionHelper } from '../helpers/controllerversion.helper';

@Controller(ControllerVersionHelper.v1 + 'auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post()
  async login() {
    return { success: true };
  }
}
