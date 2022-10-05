import {IsNumberString } from "class-validator";
import {paginateMessage} from '../messages/paginate.message'

export class PaginateDto {
  @IsNumberString({ message: paginateMessage.limit })
  limit: string;
  @IsNumberString({ message: paginateMessage.page })
  page : string;

}
