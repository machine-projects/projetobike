import { IsEmail, IsNotEmpty, IsString, Matches, IsDateString } from "class-validator";
import { Exp } from "../helpers/regex.helper";
import {userMessage} from '../messages/users.messages'

export class CreateUserDto {
  @IsEmail({ message: userMessage.email })
  email: String;
  @IsNotEmpty({ message: userMessage.firstName })
  firstName: String;
  @IsNotEmpty({ message: userMessage.lastName })
  lastName: String;
  @IsString({ message: userMessage.password })
  password: String;
  @Matches(Exp.cpf, { message: userMessage.cpf })
  cpf: String;
  @IsNotEmpty({ message: userMessage.sex })
  sex: String;
  @IsDateString({ message: userMessage.birthDate})
  birthDate: Date;
  @IsNotEmpty({ message: userMessage.state})
  state: String;
  @IsNotEmpty({ message: userMessage.city})
  city: String;
  @IsNotEmpty({ message: userMessage.phoneNumber})
  phoneNumber: Number;
  @IsNotEmpty({ message: userMessage.emergencyContactName})
  emergencyContactName: String;
  @IsNotEmpty({ message: userMessage.emergencyContactPhoneNumber})
  emergencyContactPhoneNumber: Number;
  @IsNotEmpty({ message: userMessage.accountType})
  accountType: String;
}
