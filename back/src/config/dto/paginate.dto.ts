import { Transform } from "class-transformer";
import {IsInt, IsNumber, IsNumberString, IsOptional, Max, Min, } from "class-validator";
import {queryParamsMessage} from '../messages/queryParams.message'



export class PaginateDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: queryParamsMessage.limit })
  @Min(1)
  @Max(100)
  limit: number = 10;
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: queryParamsMessage.page })
  @Min(1)
  page : number = 1;


}
