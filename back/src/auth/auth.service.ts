import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}
    
    async validateUser(email: string, password: string) {
        let user: UsersEntity;
        try {
            user = await this.userService.findOne({ email })
        }
        catch (e) {
            return null
        }

        const isPasswordValid = compareSync(password, user.password)
        if (!isPasswordValid) return null
        
        return user;
    }

}
