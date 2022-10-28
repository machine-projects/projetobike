import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
        ) { }
    async login(user) {
        const payload = { sub: user.id, email: user.email, accountType: user.accountType }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async validateUser(cpf: string, password: string) {
        let user: UsersEntity;
        try {
            user = await this.userService.findOne({ cpf })
        }
        catch (e) {
            return null
        }

        const isPasswordValid = compareSync(password, user.password)
        if (!isPasswordValid) return null
        const { password: pass, ...result } = user;
        return result;
        // return user;
    }

}
