import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean  {
    try{
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (roles && roles[0] && roles[0] == Role.Public){
        return true
      }
        const { user } = context.switchToHttp().getRequest();
       return roles.some((role) => user.accountType == role);
    }
    catch (e){
      throw new UnauthorizedException(e.message)
    }
  }
}