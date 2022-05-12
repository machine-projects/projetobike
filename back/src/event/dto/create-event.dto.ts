import { isDate, isNotEmpty } from "class-validator";

export class CreateEventDto {
  @isNotEmpty()
  title: string;

  description: string;

  @isDate()
  startDate: Date;
  @isDate()
  stopDate: Date;
}
