import {IsNumberString, IsOptional } from "class-validator";
import {paginateMessage} from '../messages/paginate.message'

export class PaginateDto {
  @IsOptional()
  @IsNumberString({ message: paginateMessage.limit })
  limit: string;
  @IsOptional()
  @IsNumberString({ message: paginateMessage.page })
  page : string;

}
