import { isEmail, isNotEmpty, isString, Matches } from "class-validator";
import { Exp } from "../helpers/regex.helper";

export class CreateUserDto {
    @isNotEmpty()
    @isEmail()
    email: String;
    
    @isNotEmpty()
    @isString()
    username: String;
    @isNotEmpty()
    @isString()
    firstName: String;

    @isNotEmpty()
    @isString()
    lastName: String;

    @isNotEmpty()
    @isString()
    password: String;

    @isNotEmpty()
    @Matches(Exp.cpf)
    cpf: String;

}
