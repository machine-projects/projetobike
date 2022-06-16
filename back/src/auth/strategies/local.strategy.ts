import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { AuthMessage } from "../message/auth.message";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            usernameField: 'cpf'
        });
    }

    async validate(cpf: string, password: string){
        const user = await this.authService.validateUser(cpf, password);
        if (!user) 
            throw new UnauthorizedException(AuthMessage.PASSWORD_OR_CPF_INVALID)

        return user;
    }

}