import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { Exp } from "../helpers/regex.helper";
import {userMessage} from '../messages/users.messages'

export class CreateUserDto {
  @IsEmail(true, { message: userMessage.email })
  email: String;
  @IsNotEmpty({ message: userMessage.username })
  username: String;
  @IsNotEmpty({ message: userMessage.firstName })
  firstName: String;
  @IsNotEmpty({ message: userMessage.lastName })
  lastName: String;
  @IsString({ message: userMessage.password })
  password: String;
  @Matches(Exp.cpf, { message: userMessage.cpf })
  cpf: String;
}
