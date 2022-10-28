import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { AuthMessage } from "../message/auth.message";

export class AuthDto {
  

    @IsString({ message: AuthMessage.PASSWORD_OR_CPF_INVALID })
    password : string;


    @Transform(({ value }) => value.split(".").join("").split("-").join("").trim())
    @IsString({ message: AuthMessage.PASSWORD_OR_CPF_INVALID })
    cpf : string;
  

}
