import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/auth/role.enum';
import { ROLES_KEY } from 'src/auth/roles.decorator';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean  {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());


    // const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
      
    // ]);
    // if (!requiredRoles) {
    //   return true;
    // }
    // const x = context.switchToHttp().getRequest();
    // validateRequest(x)
      const { user } = context.switchToHttp().getRequest();
    const request = context.switchToHttp().getRequest();
    //  return true

     return roles.some((role) => user.accountType?.includes(role));
  }
}