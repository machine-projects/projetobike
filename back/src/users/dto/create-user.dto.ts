import { isEmail, isNotEmpty, isString, Matches } from "class-validator";
import { Exp } from "../helpers/regex.helper";

export class CreateUserDto {
    email: String;
    
    username: String;
    firstName: String;

    lastName: String;

    password: String;

    @Matches(Exp.cpf)
    cpf: String;

}
