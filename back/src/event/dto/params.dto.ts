import {IsBoolean, IsNumberString, IsOptional, IsString } from "class-validator";
import {queryParamsMessage} from '../../config/messages/queryParams.message'
import { PaginateDto } from "../../config/dto/paginate.dto";
import { Transform } from "class-transformer";

export class QueryParamsDto extends PaginateDto {

  
  @IsOptional()
  @IsString({ message: queryParamsMessage.city })
  city : string;
  @IsOptional()
  @IsString({ message: queryParamsMessage.state })
  state : string;
  @IsOptional()
  @IsString({ message: queryParamsMessage.title })
  title : string;
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  @IsBoolean({ message: queryParamsMessage.isFeatured })
  isFeatured : boolean;

}
