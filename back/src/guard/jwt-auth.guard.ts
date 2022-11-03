// import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { AuthGuard } from '@nestjs/passport';
// import { IS_PUBLIC_KEY } from './public.guard';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//     constructor(private reflector: Reflector) {
//       super();
//     }

//     canActivate(context: ExecutionContext) {
//         // Add your custom authentication logic here
//         // for example, call super.logIn(request) to establish a session.
//         const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//             context.getHandler(),
//             context.getClass(),
//           ]);
//           if (isPublic) {
//             return true;
//           }
//         return super.canActivate(context);
//       }
    
//       handleRequest(err, user, info) {
//         // You can throw an exception based on either "info" or "err" arguments
//         if (err || !user) {
//           throw err || new UnauthorizedException();
//         }
//         return user;
//       }
// }


import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './role.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private reflector: Reflector) {
      super();
    }
    
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        const isPublic = this.reflector.getAllAndOverride<boolean>(Role.Public, [
            context.getHandler(),
            context.getClass(),
          ]);
          if (isPublic) {
            return true;
          }
        return super.canActivate(context);
      }
    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        request.user = user;
        return user;
    }
}
